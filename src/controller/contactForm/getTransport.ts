import { siteConfigs } from "../../../siteConfigs";

export const getTransport = (origin) => {
  if (process.env.MODE === "development")
    return {
      mailMeta: {
        to: "test@testing.com",
        from: "test@testing.com",
        subject: "Test Contact Form Email",
      },
      transport: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0e3bfe94871ac5",
          pass: "14e9339f377b0f",
        },
      },
    };
  const { transport, mailMeta } = siteConfigs.filter(
    (site) => site.origin === origin
  )[0];

  console.log("\n\n\ntransport: ", transport);
  console.log("\n\n\nmailMeta: ", mailMeta);

  return { transport, mailMeta };
};
