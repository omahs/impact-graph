import { assert } from 'chai';
import {
  graphqlUrl,
  saveCategoryDirectlyToDb,
  saveMainCategoryDirectlyToDb,
} from '../../test/testUtils';
import axios from 'axios';
import {
  getCategoryData,
  getMainCategoriesData,
} from '../../test/graphqlQueries';
import { generateRandomString } from '../utils/utils';

describe('mainCategoryTestCases() test cases', mainCategoryTestCases);
describe('categoryTestCases() test cases', categoryTestCases);

function mainCategoryTestCases() {
  it('Should show main categories and categories ordered alphabetically', async () => {
    const title = 'z' + generateRandomString(10); // ensure it's last
    const mainCategory = await saveMainCategoryDirectlyToDb({
      banner: '',
      description: '',
      slug: generateRandomString(10),
      title,
    });

    const title2 = 'a' + generateRandomString(10); // ensure it's first
    const mainCategory2 = await saveMainCategoryDirectlyToDb({
      banner: '',
      description: '',
      slug: generateRandomString(10),
      title: title2,
    });

    // save it's categories to sort them
    const name = 'z' + generateRandomString(10); // ensure it's last
    const category1 = await saveCategoryDirectlyToDb({
      name,
      mainCategory,
      value: 'Agriculture',
      isActive: true,
    });

    const name2 = 'a' + generateRandomString(10); // ensure it's first
    const category2 = await saveCategoryDirectlyToDb({
      name: name2,
      mainCategory,
      value: 'Agriculture',
      isActive: true,
    });

    const categoryResponse = await axios.post(graphqlUrl, {
      query: getMainCategoriesData,
      variables: {},
    });
    const result = categoryResponse.data.data.mainCategories;
    assert.isNotEmpty(result);

    assert.equal(result[0].title, mainCategory2.title);
    assert.equal(result[result.length - 1].title, mainCategory.title);

    // assert categories ordered alphabetically for maincategory1
    assert.equal(result[result.length - 1].categories[0].name, category2.name);
    assert.equal(result[result.length - 1].categories[1].name, category1.name);

    // clean up for subsequent test
    await category1.remove();
    await category2.remove();
    await mainCategory.remove();
    await mainCategory2.remove();
  });
  it('Should just return subcategories that have isActive:true', async () => {
    const title = 'aa' + generateRandomString(10); // ensure it's first
    const mainCategory = await saveMainCategoryDirectlyToDb({
      banner: '',
      description: '',
      slug: generateRandomString(10),
      title,
    });

    const name1 = generateRandomString(10); // ensure it's first
    const name2 = generateRandomString(10); // ensure it's first
    const category = await saveCategoryDirectlyToDb({
      name: name1,
      mainCategory,
      value: 'Agriculture',
      isActive: true,
    });
    const category2 = await saveCategoryDirectlyToDb({
      name: name2,
      mainCategory,
      value: 'Agriculture',
      isActive: false,
    });

    const categoryResponse = await axios.post(graphqlUrl, {
      query: getMainCategoriesData,
      variables: {},
    });
    const result = categoryResponse.data.data.mainCategories;
    assert.isNotEmpty(result);

    assert.equal(result[0].title, mainCategory.title);
    assert.equal(result[0].categories.length, 1);

    assert.equal(result[0].categories[0].name, category.name);

    // clean up for subsequent test
    await category.remove();
    await category2.remove();
  });
}

function categoryTestCases() {
  it('Should show categories ordered alphabetically', async () => {
    const mainCategory = await saveMainCategoryDirectlyToDb({
      banner: '',
      description: '',
      slug: 'environment-and-energy-test2',
      title: 'Economics & Infrastructure test2',
    });

    const name = 'z' + generateRandomString(10); // ensure it's last
    const category1 = await saveCategoryDirectlyToDb({
      name,
      mainCategory,
      value: 'Agriculture',
      isActive: true,
    });

    const name2 = 'a' + generateRandomString(10); // assert it's first
    const category2 = await saveCategoryDirectlyToDb({
      name: name2,
      mainCategory,
      value: 'Agriculture',
      isActive: true,
    });

    const categoryResponse = await axios.post(graphqlUrl, {
      query: getCategoryData,
      variables: {},
    });
    const result = categoryResponse?.data?.data?.categories;
    assert.isNotEmpty(result);
    assert.equal(
      result[result.length - 1].mainCategory.title,
      mainCategory.title,
    );

    assert.equal(result[0].name, category2.name);
    assert.equal(result[result.length - 1].name, category1.name);
  });
}
