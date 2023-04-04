import "@testing-library/jest-dom";
import { beforeAll, vi } from "vitest";
import { createContext } from 'react';

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
})