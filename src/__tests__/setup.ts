import "@testing-library/jest-dom";
import { beforeAll, vi } from "vitest";
import { createContext } from 'react';

vi.mock('next/dist/shared/lib/router-context.js', () => ({
  RouterContext: createContext(true),
}));

// beforeAll(() => {
//   vi.mock("next/router", () => require("next-router-mock"));
// })