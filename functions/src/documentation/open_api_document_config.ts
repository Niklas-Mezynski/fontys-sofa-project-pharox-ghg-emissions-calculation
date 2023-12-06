export const openApiDocumentConfig = {
  openapi: "3.0.3",
  info: {
    title: "GHG Emission Calculation API",
    description:
      // eslint-disable-next-line quotes
      '<p>API to make the calculation of Greenhouse gasses emissions during logistic activities.</p><p>Built following the <a href="https://www.smartfreightcentre.org/en/our-programs/global-logistics-emissions-council/calculate-report-glec-framework/">GLEC framework</a>.</p>',
    version: "0.0.0",
  },
  servers: [
    {
      url: "http://127.0.0.1:{port}/pharox-sofa-project/us-central1",
      description: "Local Development Server",
      variables: {
        port: {
          default: "5001",
          description: "Port where the local development server is running on",
        },
      },
    },
    {
      url: "https://us-central1-pharox-sofa-project.cloudfunctions.net",
      description: "Online Production Server",
    },
  ],
  tags: [
    {
      name: "Emission calculations",
      description: "Functions related to calculation of emissions",
    },
    {
      name: "Emission calculation reports",
      description: "Functions related to emission calculation reports",
    },
    {
      name: "Fuel Emission factors",
      description: "Functions related to fuel emission factors",
    },
    {
      name: "Intensity emission factors",
      description: "Functions related to intensity emission factors",
    },
    {
      name: "Common",
      description: "Functions related to entities used in the system",
    },
    {
      name: "Units",
      description: "Functions related to units being used in the system",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
};
