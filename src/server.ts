import { fastify } from "fastify";
import { teams } from "./data/teams";
import { drivers } from "./data/drivers";
import cors from "@fastify/cors";
const server = fastify({
  logger: true,
});
server.register(cors, {
  origin: "*",
});
server.get("/", async (req, res) => {
  res.type("application/json").code(200);
  return teams;
});

server.get("/drivers/", async (req, res) => {
  res.type("application/json").code(200);
  return drivers;
});

interface DriverParams {
  id: string;
}
server.get<{ Params: DriverParams }>("/driver/:id", async (req, res) => {
  const { id } = req.params;
  const idNumber = parseInt(id);
  res.type("application/json");
  const driver = drivers.find((driver) => driver.id === idNumber);
  if (!driver) {
    res.code(404);
    return { error: "Driver not found" };
  }
  res.code(200);
  return driver;
});

server.listen({ port: 3000 }, () => {
  console.log("Server is running on port 3000");
});
