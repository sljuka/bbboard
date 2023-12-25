describe("BBBoards", () => {
  it("Create card", () => {
    cy.visit("/");

    cy.contains("New Board").click();

    cy.get("input[name=board-name]").type("Test board");

    cy.contains("Save").click();

    cy.url().should("include", "/board");

    cy.get(".column-dropdown").first().click();

    cy.get(".add-card-option").click();

    cy.get("input[name=card-name]").invoke("val", "Test card");

    cy.contains("Save").click();

    cy.contains("Test card").click();

    cy.url().should("include", "/card");

    cy.contains("Card details");
  });
});
