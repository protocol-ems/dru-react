import { render } from "@testing-library/react";
import Login from "src/components/userauth/Login";

describe("Login Component", () => {
  it("render login email input", () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email");
    expect(emailInput).toBeTruthy();
  });
});
