import reactIcon from "@/assets/image/skill/reactjs-icon.svg";
import nextIcon from "@/assets/image/skill/nextjs-icon.svg";
import tsIcon from "@/assets/image/skill/typescriptlang-icon.svg";
import flutterIcon from "@/assets/image/skill/flutterio-icon.svg";
import nodeIcon from "@/assets/image/skill/nodejs-icon.svg";
import expressIcon from "@/assets/image/skill/expressjs-icon.svg";
import nestIcon from "@/assets/image/skill/nestjs-icon.svg";
import serverlessIcon from "@/assets/image/skill/serverless-icon.svg";
import dockerIcon from "@/assets/image/skill/docker-icon.svg";
import datadogIcon from "@/assets/image/skill/datadoghq-icon.svg";
import postgresIcon from "@/assets/image/skill/postgresql-icon.svg";
import mysqlIcon from "@/assets/image/skill/mysql-icon.svg";
import mongoIcon from "@/assets/image/skill/mongodb-icon.svg";
import drupalIcon from "@/assets/image/skill/drupal-icon.svg";

import javascriptIcon from "@/assets/image/tech-stack/javascript.svg";
import javaIcon from "@/assets/image/tech-stack/java.svg";
import vueIcon from "@/assets/image/tech-stack/vue.svg";
import html5Icon from "@/assets/image/tech-stack/html-5.svg";
import css3Icon from "@/assets/image/tech-stack/css.svg";
import sassIcon from "@/assets/image/tech-stack/sass.svg";
import railsIcon from "@/assets/image/tech-stack/rails.svg";
import springBootIcon from "@/assets/image/tech-stack/spring.svg";
import csharpIcon from "@/assets/image/tech-stack/c-sharp.svg";
import dotnetIcon from "@/assets/image/tech-stack/dotnet.svg";
import awsLambdaIcon from "@/assets/image/tech-stack/aws-lambda.svg";
import awsEc2Icon from "@/assets/image/tech-stack/aws-ec2.svg";
import awsS3Icon from "@/assets/image/tech-stack/aws-s3.svg";
import awsRdsIcon from "@/assets/image/tech-stack/aws-rds.svg";
import awsSqsIcon from "@/assets/image/tech-stack/aws-sqs.svg";
import awsApiGatewayIcon from "@/assets/image/tech-stack/aws-api-gateway.svg";
import kubernetesIcon from "@/assets/image/tech-stack/kubernetes.svg";
import jenkinsIcon from "@/assets/image/tech-stack/jenkins.svg";
import bitbucketIcon from "@/assets/image/tech-stack/bitbucket.svg";
import gitIcon from "@/assets/image/tech-stack/git.svg";
import dynamodbIcon from "@/assets/image/tech-stack/aws-dynamodb.svg";
import typeormIcon from "@/assets/image/tech-stack/typeorm.svg";
import stripeIcon from "@/assets/image/tech-stack/stripe.svg";
import plaidIcon from "@/assets/image/tech-stack/plaid.svg";
import sendgridIcon from "@/assets/image/tech-stack/sendgrid.svg";
import airtableIcon from "@/assets/image/tech-stack/airtable.svg";
import calendlyIcon from "@/assets/image/tech-stack/calendly.svg";
import openaiIcon from "@/assets/image/tech-stack/openai.svg";

// Curated separately from `SKILLS` (home/skill-block) on purpose: the
// falling-icon canvas tracks the fuller "24+ Technologies & Tools" list,
// not the shorter homepage marquee.
export const FALLING_ICON_SKILLS = [
  // Languages & Frontend
  { name: "JavaScript", icon: javascriptIcon },
  { name: "TypeScript", icon: tsIcon },
  { name: "Java", icon: javaIcon },
  { name: "React", icon: reactIcon },
  { name: "Next.js", icon: nextIcon },
  { name: "Vue.js", icon: vueIcon },
  { name: "React Native", icon: reactIcon },
  { name: "Flutter", icon: flutterIcon },
  { name: "HTML5", icon: html5Icon },
  { name: "CSS3", icon: css3Icon },
  { name: "Sass", icon: sassIcon },
  // Backend & Cloud/DevOps
  { name: "Node.js", icon: nodeIcon },
  // { name: "Express.js", icon: expressIcon },
  { name: "NestJS", icon: nestIcon },
  { name: "Ruby on Rails", icon: railsIcon },
  { name: "Spring Boot", icon: springBootIcon },
  { name: "C#", icon: csharpIcon },
  { name: ".NET", icon: dotnetIcon },
  { name: "Serverless Architecture", icon: serverlessIcon },
  { name: "AWS Lambda", icon: awsLambdaIcon },
  { name: "Amazon EC2", icon: awsEc2Icon },
  { name: "Amazon S3", icon: awsS3Icon },
  { name: "Amazon RDS", icon: awsRdsIcon },
  { name: "Amazon SQS", icon: awsSqsIcon },
  { name: "Amazon API Gateway", icon: awsApiGatewayIcon },
  { name: "Docker", icon: dockerIcon },
  { name: "Kubernetes", icon: kubernetesIcon },
  { name: "Jenkins", icon: jenkinsIcon },
  { name: "Bitbucket", icon: bitbucketIcon },
  { name: "Git", icon: gitIcon },
  { name: "Datadog", icon: datadogIcon },
  // Databases, Integrations & CMS
  { name: "PostgreSQL", icon: postgresIcon },
  { name: "MySQL", icon: mysqlIcon },
  { name: "MongoDB", icon: mongoIcon },
  { name: "DynamoDB", icon: dynamodbIcon },
  { name: "TypeORM", icon: typeormIcon },
  { name: "Stripe", icon: stripeIcon },
  { name: "Plaid", icon: plaidIcon },
  { name: "SendGrid", icon: sendgridIcon },
  { name: "Airtable", icon: airtableIcon },
  { name: "Calendly", icon: calendlyIcon },
  // { name: "OpenAI API", icon: openaiIcon },
  { name: "Drupal", icon: drupalIcon },
] as const;
