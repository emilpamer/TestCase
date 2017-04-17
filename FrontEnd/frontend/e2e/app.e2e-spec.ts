import { DietCalculatorPage } from './app.po';

describe('diet-calculator App', function() {
  let page: DietCalculatorPage;

  beforeEach(() => {
    page = new DietCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
