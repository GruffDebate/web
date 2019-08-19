const crypto = require('crypto');
const axios = require('axios');
const path = require(`path`);

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
  
  const result = await axios.get(`${process.env.GATSBY_API_URL}/api/claims`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Gruff": "Gruff"
    }
  });

  if (result.data) {
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
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/c/) && !page.path.match(/^\/claims/)) {
    page.matchPath = "/c/:key";
    createPage(page);
  }

  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`
    createPage(page)
  }
};
