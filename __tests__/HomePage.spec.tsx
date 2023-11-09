import Home from "@/app/page";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
/**
 * expect를 사용하고, toBeInTheDocument사용시 해당조건이 충족될까지 기다린다.
 */

describe("Home Page ", () => {
  describe("Rendering", () => {
    it("should have Home Page text", () => {
      render(<Home />);
      expect(screen.getByText("Home Page")).toBeInTheDocument();
    });

    it("should have button with text Click Me", () => {
      render(<Home />);
      expect(
        screen.getByRole("button", { name: "Click Me" })
      ).toBeInTheDocument();
    });

    it("should have input field with label Enter Random Text", () => {
      render(<Home />);
      expect(screen.getByLabelText(/Enter Random Text/)).toBeInTheDocument();
    });

    it("should have input field with label Enter Specific Text", () => {
      render(<Home />);
      expect(screen.getByLabelText(/Specific/)).toBeInTheDocument();
    });

    it("should find input field by placeholder text Search", () => {
      render(<Home />);
      expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
    });

    it("should find input field by display value", () => {
      render(<Home />);
      screen.getByDisplayValue(/AUDI/);
    });

    it("should not find element with text: This is the text!", () => {
      render(<Home />);
      expect(screen.queryByText("This is the text!")).not.toBeInTheDocument();
    });
  });

  /**
 *  findByText 비동기적으로 element를 찾음 ex) apiCall
    queryByText 동기 / 비동기적으로 사용가능, element가 있을수도, 없을수도 있는경우에 사용
    조건사용시 유용 
    getByText :반드시 존재하야하는 경우 사용 
 * 
 */

  describe("Behavior", () => {
    it("should click on Show Text Button and find new Text", async () => {
      render(<Home />);
      expect(screen.queryByText("This is the text!")).not.toBeInTheDocument();
      const showTextButton = screen.getByRole("button", { name: "Show Text" });
      await userEvent.click(showTextButton);
      expect(
        await screen.findByText("This is the text!", {}, { timeout: 2000 })
      ).toBeInTheDocument();
    });
  });
});
