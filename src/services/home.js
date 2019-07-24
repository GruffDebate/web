import { request } from "../utils/api";

export const ListClaims = (filter = 0) => {
  return request({
    method: "get",
    baseUrl: "api",
    route: filter === 0 ? "claims/top" : "claims"
  });
  // if (filter === 0) {
  //   return [
  //     {
  //       id: 1,
  //       title: "Who should the Democratic nominee for President in 2020 be?",
  //       img: "https://www.kialo.com/images/a9e796f0-9ded-4717-91bc-5eca82f8eb05_444x144.jpeg"
  //     },
  //     {
  //       id: 2,
  //       title: "Who should the Democratic nominee for President in 2020 be?",
  //       img: "https://www.kialo.com/images/a9e796f0-9ded-4717-91bc-5eca82f8eb05_444x144.jpeg"
  //     },
  //     {
  //       id: 3,
  //       title: "Who should the Democratic nominee for President in 2020 be?",
  //       img: "https://www.kialo.com/images/a9e796f0-9ded-4717-91bc-5eca82f8eb05_444x144.jpeg"
  //     },
  //     {
  //       id: 4,
  //       title: "Who should the Democratic nominee for President in 2020 be?",
  //       img: "https://www.kialo.com/images/a9e796f0-9ded-4717-91bc-5eca82f8eb05_444x144.jpeg"
  //     },
  //     {
  //       id: 5,
  //       title: "Who should the Democratic nominee for President in 2020 be?",
  //       img: "https://www.kialo.com/images/a9e796f0-9ded-4717-91bc-5eca82f8eb05_444x144.jpeg"
  //     },
  //     {
  //       id: 6,
  //       title: "Who should the Democratic nominee for President in 2020 be?",
  //       img: "https://www.kialo.com/images/a9e796f0-9ded-4717-91bc-5eca82f8eb05_444x144.jpeg"
  //     },
  //     {
  //       id: 7,
  //       title: "Who should the Democratic nominee for President in 2020 be?",
  //       img: "https://www.kialo.com/images/a9e796f0-9ded-4717-91bc-5eca82f8eb05_444x144.jpeg"
  //     }
  //   ]
  // } else {
  //   return [
  //     {
  //       id: 1,
  //       title: "Cultural appropriation is wrong",
  //       img: "https://www.kialo.com/images/ddc7a31f-3e98-45d1-a221-6e1429152420_444x144.jpeg"
  //     },
  //     {
  //       id: 2,
  //       title: "Cultural appropriation is wrong",
  //       img: "https://www.kialo.com/images/ddc7a31f-3e98-45d1-a221-6e1429152420_444x144.jpeg"
  //     },
  //     {
  //       id: 3,
  //       title: "Cultural appropriation is wrong",
  //       img: "https://www.kialo.com/images/ddc7a31f-3e98-45d1-a221-6e1429152420_444x144.jpeg"
  //     },
  //     {
  //       id: 4,
  //       title: "Cultural appropriation is wrong",
  //       img: "https://www.kialo.com/images/ddc7a31f-3e98-45d1-a221-6e1429152420_444x144.jpeg"
  //     },
  //     {
  //       id: 5,
  //       title: "Cultural appropriation is wrong",
  //       img: "https://www.kialo.com/images/ddc7a31f-3e98-45d1-a221-6e1429152420_444x144.jpeg"
  //     },
  //     {
  //       id: 6,
  //       title: "Cultural appropriation is wrong",
  //       img: "https://www.kialo.com/images/ddc7a31f-3e98-45d1-a221-6e1429152420_444x144.jpeg"
  //     },
  //     {
  //       id: 7,
  //       title: "Cultural appropriation is wrong",
  //       img: "https://www.kialo.com/images/ddc7a31f-3e98-45d1-a221-6e1429152420_444x144.jpeg"
  //     }
  //   ]
  // }
};
