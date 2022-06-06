import { assert } from 'chai';
import axios from 'axios';
import {
  createProjectData,
  generateConfirmationEmailToken,
  generateRandomEtheriumAddress,
  generateTestAccessToken,
  graphqlUrl,
  saveProjectDirectlyToDb,
  saveUserDirectlyToDb,
  sleep,
} from '../../test/testUtils';
import {
  createProjectVerificationFormMutation,
  getAllowedCountries,
  getCurrentProjectVerificationFormQuery,
  projectVerificationConfirmEmail,
  projectVerificationSendEmailConfirmation,
  updateProjectVerificationFormMutation,
} from '../../test/graphqlQueries';
import {
  ManagingFunds,
  Milestones,
  PROJECT_VERIFICATION_STATUSES,
  PROJECT_VERIFICATION_STEPS,
  ProjectContacts,
  ProjectRegistry,
  ProjectVerificationForm,
  PersonalInfo,
} from '../entities/projectVerificationForm';
import { Project, ProjStatus } from '../entities/project';
import {
  createProjectVerificationForm,
  findProjectVerificationFormById,
} from '../repositories/projectVerificationRepository';
import { errorMessages } from '../utils/errorMessages';
import { NETWORK_IDS } from '../provider';
import { countriesList } from '../utils/utils';

describe(
  'createProjectVerification test cases',
  createProjectVerificationFormMutationTestCases,
);
describe(
  'getCurrentProjectVerificationForm test cases',
  getCurrentProjectVerificationFormTestCases,
);

describe(
  'updateProjectVerificationFormMutation test cases',
  updateProjectVerificationFormMutationTestCases,
);

describe('getAllowedCountries test cases', getAllowedCountriesTestCases);

function createProjectVerificationFormMutationTestCases() {
  it('should create project verification form successfully', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: createProjectVerificationFormMutation,
        variables: {
          projectId: project.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    assert.equal(
      result.data.data.createProjectVerificationForm.status,
      PROJECT_VERIFICATION_STATUSES.DRAFT,
    );
    assert.isNotOk(
      result.data.data.createProjectVerificationForm.managingFunds,
    );
    assert.isNotOk(
      result.data.data.createProjectVerificationForm.projectContacts,
    );
    assert.isNotOk(
      result.data.data.createProjectVerificationForm.projectRegistry,
    );
  });
  it('should not create project verification because user that is authenticated is not project owner', async () => {
    const user1 = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const user2 = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user1.id),
      verified: false,
      listed: false,
    });
    const accessToken = await generateTestAccessToken(user2.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: createProjectVerificationFormMutation,
        variables: {
          projectId: project.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    assert.equal(
      result.data.errors[0].message,
      'You are not the owner of this project.',
    );
  });
  it('should not create project verification because project verified before', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: true,
      listed: false,
    });
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: createProjectVerificationFormMutation,
        variables: {
          projectId: project.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(result.data.errors[0].message, 'Project is already verified.');
  });
  it('should not create project verification because project not found', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const projectId = Number(await Project.count()) + 3;
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: createProjectVerificationFormMutation,
        variables: {
          projectId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(result.data.errors[0].message, 'Project not found.');
  });
  it('should not create project verification because user not found', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const result = await axios.post(graphqlUrl, {
      query: createProjectVerificationFormMutation,
      variables: {
        projectId: project.id,
      },
    });
    assert.equal(result.data.errors[0].message, 'unAuthorized');
  });
  it('should not create project verification because user have draft project verification', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const accessToken = await generateTestAccessToken(user.id);

    await ProjectVerificationForm.create({
      project,
      user,
      status: 'draft',
    }).save();
    const result = await axios.post(
      graphqlUrl,
      {
        query: createProjectVerificationFormMutation,
        variables: {
          projectId: project.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(
      result.data.errors[0].message,
      'There is an ongoing project verification request for this project',
    );
  });
  it('should not create project verification because user have submitted project verification', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const accessToken = await generateTestAccessToken(user.id);

    await ProjectVerificationForm.create({
      project,
      user,
      status: 'submitted',
    }).save();
    const result = await axios.post(
      graphqlUrl,
      {
        query: createProjectVerificationFormMutation,
        variables: {
          projectId: project.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(
      result.data.errors[0].message,
      'There is an ongoing project verification request for this project',
    );
  });
}

function updateProjectVerificationFormMutationTestCases() {
  const personalInfo: PersonalInfo = {
    email: 'test@example.com',
    fullName: 'test',
    walletAddress: 'xxxxx',
  };
  const projectContacts: ProjectContacts = {
    facebook: 'facebookAddress',
    instagram: 'instagramAddress',
    linkedin: 'linkedinAddress',
    twitter: '',
    youtube: 'youtubeAddress',
  };
  const projectRegistry: ProjectRegistry = {
    organizationWebsite: 'org website',
    organizationCountry: 'France',
    isNonProfitOrganization: true,
    organizationDescription: '',
  };
  const milestones: Milestones = {
    mission: 'mission',
    achievedMilestonesProof: 'an ipfs hash',
    achievedMilestones: 'lots of work',
    foundationDate: new Date(),
  };
  const managingFunds: ManagingFunds = {
    description: 'description!!!',
    relatedAddresses: [
      {
        address: generateRandomEtheriumAddress(),
        networkId: NETWORK_IDS.MAIN_NET,
        title: 'test title',
      },
    ],
  };
  it('should update project verification with projectContacts form successfully', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: updateProjectVerificationFormMutation,
        variables: {
          projectVerificationUpdateInput: {
            projectVerificationId: projectVerification.id,
            step: PROJECT_VERIFICATION_STEPS.PROJECT_CONTACTS,
            projectContacts,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.isOk(result.data.data.updateProjectVerificationForm);
    assert.equal(
      result.data.data.updateProjectVerificationForm.status,
      PROJECT_VERIFICATION_STATUSES.DRAFT,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.projectContacts.linkedin,
      projectContacts.linkedin,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.projectContacts.twitter,
      projectContacts.twitter,
    );
  });
  it('should update project verification with personalinfo form successfully', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: updateProjectVerificationFormMutation,
        variables: {
          projectVerificationUpdateInput: {
            projectVerificationId: projectVerification.id,
            step: PROJECT_VERIFICATION_STEPS.PERSONAL_INFO,
            personalInfo,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.isOk(result.data.data.updateProjectVerificationForm);
    assert.equal(
      result.data.data.updateProjectVerificationForm.status,
      PROJECT_VERIFICATION_STATUSES.DRAFT,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.personalInfo.email,
      personalInfo.email,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.personalInfo.fullName,
      personalInfo.fullName,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.personalInfo.walletAddress,
      personalInfo.walletAddress,
    );
  });
  it('should send email confirmation for project verification for personalinfo step', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
      personalInfo,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: projectVerificationSendEmailConfirmation,
        variables: {
          projectVerificationFormId: projectVerification.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.isOk(result.data.data.projectVerificationSendEmailConfirmation);
    assert.equal(
      result.data.data.projectVerificationSendEmailConfirmation.status,
      PROJECT_VERIFICATION_STATUSES.DRAFT,
    );
    assert.equal(
      result.data.data.projectVerificationSendEmailConfirmation
        .emailConfirmationSent,
      true,
    );
    assert.isNotNull(
      result.data.data.projectVerificationSendEmailConfirmation
        .emailConfirmationToken,
    );
  });
  it('should confirm email for project verification in personalinfo step', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
      personalInfo,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    const emailConfirmationSentResult = await axios.post(
      graphqlUrl,
      {
        query: projectVerificationSendEmailConfirmation,
        variables: {
          projectVerificationFormId: projectVerification.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const token =
      emailConfirmationSentResult.data.data
        .projectVerificationSendEmailConfirmation.emailConfirmationToken;

    const result = await axios.post(
      graphqlUrl,
      {
        query: projectVerificationConfirmEmail,
        variables: {
          emailConfirmationToken: token,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.isOk(result.data.data.projectVerificationConfirmEmail);
    assert.equal(
      result.data.data.projectVerificationConfirmEmail.status,
      PROJECT_VERIFICATION_STATUSES.DRAFT,
    );
    assert.equal(
      result.data.data.projectVerificationConfirmEmail.emailConfirmed,
      true,
    );
    assert.isNotNull(
      result.data.data.projectVerificationConfirmEmail.emailConfirmedAt,
    );
  });
  it('should throw error when confirm email token invalid for project verification in personalinfo step', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
      personalInfo,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    project;

    const token = await generateConfirmationEmailToken(projectVerification.id);
    projectVerification.emailConfirmationToken = token;
    await projectVerification.save();
    await sleep(500);

    const result = await axios.post(
      graphqlUrl,
      {
        query: projectVerificationConfirmEmail,
        variables: {
          emailConfirmationToken: token,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(result.data.errors[0].message, 'jwt expired');
    const projectVerificationReinitializedEmailParams =
      await findProjectVerificationFormById(projectVerification.id);

    assert.isFalse(projectVerificationReinitializedEmailParams!.emailConfirmed);
    assert.isFalse(
      projectVerificationReinitializedEmailParams!.emailConfirmationSent,
    );
    assert.isNull(
      projectVerificationReinitializedEmailParams!.emailConfirmationSentAt,
    );
    assert.isNull(
      projectVerificationReinitializedEmailParams!.emailConfirmationToken,
    );
  });
  it('should update project verification with projectRegistry form successfully', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: updateProjectVerificationFormMutation,
        variables: {
          projectVerificationUpdateInput: {
            projectVerificationId: projectVerification.id,
            step: PROJECT_VERIFICATION_STEPS.PROJECT_REGISTRY,
            projectRegistry,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.isOk(result.data.data.updateProjectVerificationForm);

    assert.equal(
      result.data.data.updateProjectVerificationForm.status,
      PROJECT_VERIFICATION_STATUSES.DRAFT,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.projectRegistry
        .organizationDescription,
      projectRegistry.organizationDescription,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.projectRegistry
        .organizationCountry,
      projectRegistry.organizationCountry,
    );
  });
  it('should update project verification with milestones form successfully', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: updateProjectVerificationFormMutation,
        variables: {
          projectVerificationUpdateInput: {
            projectVerificationId: projectVerification.id,
            step: PROJECT_VERIFICATION_STEPS.MILESTONES,
            milestones,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.isOk(result.data.data.updateProjectVerificationForm);

    assert.equal(
      result.data.data.updateProjectVerificationForm.status,
      PROJECT_VERIFICATION_STATUSES.DRAFT,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.milestones
        .achievedMilestones,
      milestones.achievedMilestones,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.milestones
        .achievedMilestonesProof,
      milestones.achievedMilestonesProof,
    );
  });
  it('should update project verification with managingFunds form successfully', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: updateProjectVerificationFormMutation,
        variables: {
          projectVerificationUpdateInput: {
            projectVerificationId: projectVerification.id,
            step: PROJECT_VERIFICATION_STEPS.MANAGING_FUNDS,
            managingFunds,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.isOk(result.data.data.updateProjectVerificationForm);

    assert.equal(
      result.data.data.updateProjectVerificationForm.status,
      PROJECT_VERIFICATION_STATUSES.DRAFT,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.managingFunds.description,
      managingFunds.description,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm.managingFunds
        .relatedAddresses[0].address,
      managingFunds.relatedAddresses[0].address,
    );
  });
  it('should update project verification with termAndConditions form successfully', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: updateProjectVerificationFormMutation,
        variables: {
          projectVerificationUpdateInput: {
            projectVerificationId: projectVerification.id,
            step: PROJECT_VERIFICATION_STEPS.TERM_AND_CONDITION,
            isTermAndConditionsAccepted: true,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.isOk(result.data.data.updateProjectVerificationForm);

    assert.equal(
      result.data.data.updateProjectVerificationForm.status,
      PROJECT_VERIFICATION_STATUSES.DRAFT,
    );
    assert.equal(
      result.data.data.updateProjectVerificationForm
        .isTermAndConditionsAccepted,
      true,
    );
  });
  it('should update project verification with submit form successfully', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerification = await ProjectVerificationForm.create({
      project,
      user,
      personalInfo,
      projectRegistry,
      projectContacts,
      milestones,
      managingFunds,
      status: PROJECT_VERIFICATION_STATUSES.DRAFT,
      emailConfirmed: true,
      isTermAndConditionsAccepted: true,
    }).save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: updateProjectVerificationFormMutation,
        variables: {
          projectVerificationUpdateInput: {
            projectVerificationId: projectVerification.id,
            step: PROJECT_VERIFICATION_STEPS.SUBMIT,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.isOk(result.data.data.updateProjectVerificationForm);

    assert.equal(
      result.data.data.updateProjectVerificationForm.status,
      PROJECT_VERIFICATION_STATUSES.SUBMITTED,
    );
  });
}

function getCurrentProjectVerificationFormTestCases() {
  it('should throw error when the project is already verified', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user.id),
      verified: true,
      listed: false,
    });
    const projectVerificationForm = await createProjectVerificationForm({
      projectId: project.id,
      userId: user.id,
    });
    projectVerificationForm.status = PROJECT_VERIFICATION_STATUSES.VERIFIED;
    await projectVerificationForm.save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: getCurrentProjectVerificationFormQuery,
        variables: {
          slug: project.slug,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(
      result.data.errors[0].message,
      errorMessages.PROJECT_IS_ALREADY_VERIFIED,
    );
  });
  it('should get current project verification form with submitted status', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerificationForm = await createProjectVerificationForm({
      projectId: project.id,
      userId: user.id,
    });
    projectVerificationForm.status = PROJECT_VERIFICATION_STATUSES.SUBMITTED;
    await projectVerificationForm.save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: getCurrentProjectVerificationFormQuery,
        variables: {
          slug: project.slug,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(
      result.data.data.getCurrentProjectVerificationForm.status,
      projectVerificationForm.status,
    );
    assert.equal(
      result.data.data.getCurrentProjectVerificationForm.id,
      projectVerificationForm.id,
    );
  });
  it('should get current project verification form with draft status', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const projectVerificationForm = await createProjectVerificationForm({
      projectId: project.id,
      userId: user.id,
    });
    projectVerificationForm.status = PROJECT_VERIFICATION_STATUSES.DRAFT;
    await projectVerificationForm.save();
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: getCurrentProjectVerificationFormQuery,
        variables: {
          slug: project.slug,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(
      result.data.data.getCurrentProjectVerificationForm.status,
      projectVerificationForm.status,
    );
    assert.equal(
      result.data.data.getCurrentProjectVerificationForm.id,
      projectVerificationForm.id,
    );
  });
  it('should not get current project verification because unauthorized', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.active,
      admin: String(user.id),
      verified: true,
      listed: false,
    });
    const projectVerificationForm = await createProjectVerificationForm({
      projectId: project.id,
      userId: user.id,
    });
    projectVerificationForm.status = PROJECT_VERIFICATION_STATUSES.SUBMITTED;
    await projectVerificationForm.save();
    const result = await axios.post(graphqlUrl, {
      query: getCurrentProjectVerificationFormQuery,
      variables: {
        slug: project.slug,
      },
    });
    assert.equal(result.data.errors[0].message, errorMessages.UN_AUTHORIZED);
  });
  it('should get current project verification because user not found', async () => {
    const user1 = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const user2 = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user1.id),
      verified: false,
      listed: false,
    });
    const projectVerificationForm = await createProjectVerificationForm({
      projectId: project.id,
      userId: user1.id,
    });
    projectVerificationForm.status = PROJECT_VERIFICATION_STATUSES.DRAFT;
    await projectVerificationForm.save();
    const accessToken = await generateTestAccessToken(user2.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: getCurrentProjectVerificationFormQuery,
        variables: {
          slug: project.slug,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(
      result.data.errors[0].message,
      errorMessages.YOU_ARE_NOT_THE_OWNER_OF_PROJECT,
    );
  });
  it('should get current project verification because project doesnt have project verification form', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const project = await saveProjectDirectlyToDb({
      ...createProjectData(),
      statusId: ProjStatus.deactive,
      admin: String(user.id),
      verified: false,
      listed: false,
    });
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: getCurrentProjectVerificationFormQuery,
        variables: {
          slug: project.slug,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(
      result.data.errors[0].message,
      errorMessages.THERE_IS_NOT_ANY_ONGOING_PROJECT_VERIFICATION_FORM_FOR_THIS_PROJECT,
    );
  });
  it('should get current project verification because project not found', async () => {
    const user = await saveUserDirectlyToDb(generateRandomEtheriumAddress());
    const accessToken = await generateTestAccessToken(user.id);
    const result = await axios.post(
      graphqlUrl,
      {
        query: getCurrentProjectVerificationFormQuery,
        variables: {
          slug: new Date().toString(),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    assert.equal(
      result.data.errors[0].message,
      errorMessages.PROJECT_NOT_FOUND,
    );
  });
}

function getAllowedCountriesTestCases() {
  it('Should return list of available country list ', async () => {
    const result = await axios.post(graphqlUrl, {
      query: getAllowedCountries,
    });
    assert.equal(
      result.data.data.getAllowedCountries.length,
      countriesList.length,
    );
  });
}