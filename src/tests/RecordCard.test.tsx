import { render, screen, fireEvent } from "@testing-library/react";
import { RecordCard } from "../components/RecordCard";

const mock = {
  id: "1",
  company_name: "Test Pharma",
  country: "UK",
  specialty: "Oncology",
  data_quality_score: 50,
  flag_reason: "Missing Specialty Data",
  status: "pending" as const,
  duplicate_of: null,
  last_updated: "2026-01-01",
};

test("renders record card", () => {
  render(
    <RecordCard
      record={mock}
      onApprove={() => {}}
      onReject={() => {}}
      onReview={() => {}}
    />
  );

  expect(screen.getByText("Test Pharma")).toBeInTheDocument();
});

test("renders country and specialty", () => {
  render(
    <RecordCard
      record={mock}
      onApprove={() => {}}
      onReject={() => {}}
      onReview={() => {}}
    />
  );

  expect(screen.getByText(/UK/)).toBeInTheDocument();
  expect(screen.getByText(/Oncology/)).toBeInTheDocument();
});

test("approve button calls handler", () => {
  const onApprove = vi.fn();

  render(
    <RecordCard
      record={mock}
      onApprove={onApprove}
      onReject={() => {}}
      onReview={() => {}}
    />
  );

  fireEvent.click(screen.getByText("✔"));
  expect(onApprove).toHaveBeenCalledTimes(1);
});

test("reject button calls handler", () => {
  const onReject = vi.fn();

  render(
    <RecordCard
      record={mock}
      onApprove={() => {}}
      onReject={onReject}
      onReview={() => {}}
    />
  );

  fireEvent.click(screen.getByText("✖"));
  expect(onReject).toHaveBeenCalledTimes(1);
});