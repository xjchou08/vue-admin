import service from "../utils/service";

export const getWorldMap = () => {
  return service({
    method: "GET",
    url: "/covid/g2/getOnsInfo?name=disease_foreign",
  });
};
