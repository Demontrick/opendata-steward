import { render, screen } from "@testing-library/react";
import { QualityBadge } from "../components/QualityBadge";

test("renders HIGH quality badge", () => {
  render(<QualityBadge score={90} />);
  expect(screen.getByText(/HIGH/i)).toBeInTheDocument();
});

test("renders MEDIUM quality badge", () => {
  render(<QualityBadge score={55} />);
  expect(screen.getByText(/MEDIUM/i)).toBeInTheDocument();
});

test("renders LOW quality badge", () => {
  render(<QualityBadge score={20} />);
  expect(screen.getByText(/LOW/i)).toBeInTheDocument();
});