const crypto = require('crypto');
const axios = require('axios');
const path = require(`path`);
const API_URI = `${process.env.GATSBY_API_URL}/api/`


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;
  
  const result = await axios.get('http://localhost:8080/api/claims', {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Gruff": "Gruff"
    }
  });

  for (const claim of result.data) {
    await createNode({
      children: [],
      id: claim.id,
      start: claim.start,
      mod: claim.mod,
      end: claim.end,
      creator: claim.creator,
      title: claim.title,
      negation: claim.negation,
      question: claim.question,
      desc: claim.desc,
      mp: claim.mp,
      mprule: claim.mprule,
      truth: claim.truth,
      truthRU: claim.truthRU,
      proargs: claim.proargs,
      conargs: claim.conargs,
      parent: null,
      internal: {
        type: 'Claim',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(claim))
          .digest(`hex`),
      },
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allClaim {
          edges {
            node {
              id
              title
              desc
              creator
            }
          }
        }
      }
    `
  ).then(result => {
    result.data.allClaim.edges.forEach(({ node }) => {
      createPage({
        path: `c/${node.id}`,
        component: path.resolve(`./src/pages/claim.jsx`),
        context: {
          id: node.id
        },
      })
    });
    resolve()
  })
  }).catch(error => {
    console.log(error)
    reject()
  })
};