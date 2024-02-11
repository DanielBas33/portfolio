const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");
const parameterName = "resendKey";
module.exports.handler = async (event) => {
  var body = JSON.parse(event.body);
  const ssmClient = new SSMClient({ region: "us-east-1" });
  const command = new GetParameterCommand({
    Name: parameterName,
    WithDecryption: true,
  });
  const parameterResult = await ssmClient.send(command);
  const parameterValue = parameterResult.Parameter.Value;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parameterValue}`,
    },
    body: JSON.stringify({
      from: "MyPortfolio <onboarding@resend.dev>",
      to: ["danielbasdelgado@gmail.com"],
      subject: "Nuevo Contacto",
      reply_to: event.email,
      text: "Email: " + body.email + "\n" + "Mensaje: " + body.message,
    }),
  });

  if (res.ok) {
    const response = {
      statusCode: 200,

      body: body.message,
    };
    return response;
  }
};
