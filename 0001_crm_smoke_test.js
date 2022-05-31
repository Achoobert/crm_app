const Common = require("../../../../setup/common.js");

const folder = __dirname.match(/[^\\/]+$/);

Cypress.on("uncaught:exception", () => {
   // returning false here prevents Cypress from
   // failing the test
   return false;
});

describe("AccountingApp:", () => {
   before(() => {
      Common.ResetDB(cy);
      Common.AuthLogin(cy);
      cy.request("POST", "/test/import", {
         file: `imports/${folder}/crmApp.json`,
      });
   });

   beforeEach(() => {
      Common.AuthLogin(cy);
   });

   it("has app in the Nav Menu", () => {
      // have critical DB tables been setup
      Common.RunSQL(cy, folder, ["init_db_default.sql"]);

      cy.visit("/");
      NavigateApp(cy);

      // Should show App in the Menu Title
      cy.get("[data-cy=portal_work_menu_title]")
         .should("be.visible")
         .should("have.text", "CRM");

      // Should have 2 pages
      cy.get("[data-cy=portal_work_menu_pages]").then((elContainer) => {
         expect(elContainer[0].childElementCount).to.equal(2);
      });
   });
});

function NavigateApp(cy) {
   cy.get("[data-cy=portal_work_menu_sidebar]").click();
   cy.get("[data-cy=1832647e-685b-4ff7-b30c-610325dfbe75]").click();
   cy.get(
      "[data-cy='menu-item Add CRM-Customer a67fbe48-f78a-4caf-a8b1-4ed798cfc05f 36016339-e521-411e-b97d-90024995b725']"
   )
      .should("be.visible")
      .filter(":visible")
      .click();
   cy.get("[data-cy^='Popup Close Button']")
      .should("be.visible")
      .filter(":visible")
      .click();
   cy.get(
      "[data-cy='menu-item Add Payment 881b27c8-870a-4252-a1cf-59680d395ece 36016339-e521-411e-b97d-90024995b725']"
   )
      .should("be.visible")
      .click();
   cy.get("[data-cy^='Popup Close Button']")
      .should("be.visible")
      .filter(":visible")
      .click();
   cy.get("[data-cy='adfb2e76-5538-4cd4-ae18-b537f1093dbf']")
      .should("be.visible")
      .click();
   cy.get(
      "[data-cy='ABViewGrid_f0207f13-e8df-4405-adf4-101e95162dc2_datatable']"
   ).should("be.visible");

   cy.get(
      "[data-cy='menu-item Memberships 29e59d49-ce2e-4511-be07-0acbe5a46ebe d3e1bf9b-7dbd-43f4-8aa0-0d3b2f4465ad']"
   )
      .should("be.visible")
      .click();
   cy.get("[data-cy^='menu-item Administration']")
      .should("be.visible")
      .filter(":visible")
      .click();
   cy.get(
      "[data-cy='menu-item Payments a4907479-dc52-4314-8811-d1d3d855c8eb d3e1bf9b-7dbd-43f4-8aa0-0d3b2f4465ad']"
   )
      .should("be.visible")
      .click();
   cy.get("[data-cy^='menu-item Administration']").should("be.visible").click();
   cy.get(
      "[data-cy='menu-item Payers 894cffe2-d5de-454e-a3e3-9b1f72ff5dfb d3e1bf9b-7dbd-43f4-8aa0-0d3b2f4465ad']"
   )
      .should("be.visible")
      .click();
   cy.get("[data-cy^='menu-item Administration']").should("be.visible").click();
}
