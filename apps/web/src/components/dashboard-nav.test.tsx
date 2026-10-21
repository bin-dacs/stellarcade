import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Dashboard, QUICK_ACTIONS } from "./dashboard";
import TournamentsPage from "../../app/(dashboard)/tournaments/page";
import RewardsPage from "../../app/(dashboard)/rewards/page";

describe("Dashboard Nav and Coming Soon state (#1508)", () => {
  it("marks /tournaments and /rewards with isComingSoon: true in QUICK_ACTIONS", () => {
    const tournamentsAction = QUICK_ACTIONS.find((a) => a.href === "/tournaments");
    const rewardsAction = QUICK_ACTIONS.find((a) => a.href === "/rewards");
    const gamesAction = QUICK_ACTIONS.find((a) => a.href === "/games");

    expect(tournamentsAction?.isComingSoon).toBe(true);
    expect(rewardsAction?.isComingSoon).toBe(true);
    expect(gamesAction?.isComingSoon).toBeFalsy();
  });

  it("renders the Soon badge and aria-disabled on unbacked nav items", () => {
    render(<Dashboard />);

    const tournamentsLink = screen.getByRole("link", { name: /tournaments/i });
    expect(tournamentsLink).toHaveAttribute("aria-disabled", "true");
    expect(tournamentsLink).toHaveTextContent("Soon");

    const rewardsLink = screen.getByRole("link", { name: /claim rewards/i });
    expect(rewardsLink).toHaveAttribute("aria-disabled", "true");
    expect(rewardsLink).toHaveTextContent("Soon");

    const gamesLinks = screen.getAllByRole("link", { name: /play a game/i });
    expect(gamesLinks[0]).not.toHaveAttribute("aria-disabled");
    expect(gamesLinks[0]).not.toHaveTextContent("Soon");
  });

  it("renders coming-soon explanation on Tournaments page", () => {
    render(<TournamentsPage />);
    expect(screen.getByText(/Coming Soon: Tournaments & Brackets/i)).toBeInTheDocument();
  });

  it("renders coming-soon explanation on Rewards page", () => {
    render(<RewardsPage />);
    expect(screen.getByText(/Coming Soon: Claim Rewards/i)).toBeInTheDocument();
  });
});
