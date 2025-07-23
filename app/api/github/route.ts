import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  // Check if GitHub token is available
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GitHub token not available");
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  try {
    const client = new ApolloClient({
      link: createHttpLink({
        uri: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }),
      cache: new InMemoryCache(),
    });

    const { data } = await client.query({
      query: gql`
        {
          user(login: "nathan-schmidt-viget") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
            pinnedItems(first: 6) {
              totalCount
              edges {
                node {
                  ... on Repository {
                    id
                    name
                    url
                    stargazerCount
                    languages(first: 10) {
                      edges {
                        node {
                          ... on Language {
                            name
                            color
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
// const response = await fetch("https://api.github.com/graphql", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//   },
//   body: JSON.stringify({
//     query: `
//       {
//         user(login: "nathan-schmidt-viget") {
//           contributionsCollection {
//             contributionCalendar {
//               totalContributions
//             }
//           }
//           pinnedItems(first: 6) {
//             totalCount
//             edges {
//               node {
//                 ... on Repository {
//                   id
//                   name
//                   url
//                   stargazerCount
//                   languages(first: 10) {
//                     edges {
//                       node {
//                         ... on Language {
//                           name
//                           color
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//   }),
// });

//   if (!response.ok) {
//     throw new Error(
//       `GitHub API error: ${response.status} ${response.statusText}`
//     );
//   }

//   const data = await response.json();
//   return NextResponse.json(data);
// } catch (error) {
//   console.error("GitHub API error:", error);
//   return NextResponse.json(
//     { error: "Failed to fetch GitHub data" },
//     { status: 500 }
//   );
// }
//}
