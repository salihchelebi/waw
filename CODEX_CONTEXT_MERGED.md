


===== README.md =====

---
description: Welcome to the official Flowise documentation
---

# Introduction

<figure><img src=".gitbook/assets/FlowiseIntro (1).gif" alt=""><figcaption></figcaption></figure>

Flowise is an open source generative AI development platform for building AI Agents and LLM workflows.

It offers a complete solution that includes:

* [x] Visual Builder
* [x] Tracing & Analytics
* [x] Evaluations
* [x] Human in the Loop
* [x] API, CLI, SDK, Embedded Chatbot
* [x] Teams & Workspaces

There are 3 main visual builders namely:

* Assistant
* Chatflow
* Agentflow

## Assistant

Assistant is the most beginner-friendly way of creating an AI Agent. Users can create chat assistant that is able to follow instructions, use tools when necessary, and retrieve knowledge base from uploaded files ([RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)) to respond to user queries.

<figure><picture><source srcset=".gitbook/assets/Screenshot 2025-06-10 232758.png" media="(prefers-color-scheme: dark)"><img src=".gitbook/assets/image (303).png" alt=""></picture><figcaption></figcaption></figure>

## Chatflow

Chatflow is designed to build single-agent systems, chatbots and simple LLM flows. It is more flexible than Assistant. Users can use advance techniques like Graph RAG, Reranker, Retriever, etc.

<figure><picture><source srcset=".gitbook/assets/screely-1749594035877.png" media="(prefers-color-scheme: dark)"><img src=".gitbook/assets/screely-1749593961545.png" alt=""></picture><figcaption></figcaption></figure>

## Agentflow

Agentflow is the superset of Chatflow & Assistant. It can be used to create chat assistant, single-agent system, multi-agent systems, and complex workflow orchestration. Learn more [Agentflow V2](using-flowise/agentflowv2.md)

<figure><picture><source srcset=".gitbook/assets/screely-1749594631028.png" media="(prefers-color-scheme: dark)"><img src=".gitbook/assets/screely-1749594614881.png" alt=""></picture><figcaption></figcaption></figure>

## Flowise Capabilities

| Feature Area                 | Flowise Capabilities                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Orchestration                | Visual editor, supports open-source & proprietary models, expressions, custom code, branching/looping/routing logic |
| Data Ingestion & Integration | Connects to 100+ sources, tools, vector databases, memories                                                         |
| Monitoring                   | Execution logs, visual debugging, external log streaming                                                            |
| Deployment                   | Self-hosted options, air-gapped deploy                                                                              |
| Data Processing              | Data transforms, filters, aggregates, custom code, RAG indexing pipelines                                           |
| Memory & Planning            | Various memory optimization technique and integrations                                                              |
| MCP Integration              | MCP client/server nodes, tool listing, SSE, auth support                                                            |
| Safety & Control             | Input moderation & output post-processing                                                                           |
| API, SDK, CLI                | API access, JS/Python SDK, Command Line Interface                                                                   |
| Embedded & Share Chatbot     | Customizable embedded chat widget and component                                                                     |
| Templates & Components       | Template marketplace, reusable components                                                                           |
| Security Controls            | RBAC, SSO, encrypted creds, secret managers, rate limit, restricted domains                                         |
| Scalability                  | Vertical/horizontal scale, high throughput/workflow load                                                            |
| Evaluations                  | Datasets, Evaluators and Evaluations                                                                                |
| Community Support            | Active community forum                                                                                              |
| Vendor Support               | SLA support, consultations, fixed/deterministic pricing                                                             |

## Contributing

If you want to help this project, please consider reviewing the [Contribution Guide](https://github.com/FlowiseAI/Flowise/blob/main/CONTRIBUTING.md).

## Need Help?

For support and further discussion, head over to our [Discord](https://discord.gg/jbaHfsRVBW) server.



===== getting-started/README.md =====

# Get Started

***

## Cloud

Self-hosting requires more technical skill to setup instance, backing up database and maintaning updates. If you aren't experienced at managing servers and just want to use the webapp, we recommend using [Flowise Cloud](https://cloud.flowiseai.com).

## Quick Start

{% hint style="info" %}
Pre-requisite: ensure [NodeJS](https://nodejs.org/en/download) is installed on machine. Node `v18.15.0` or `v20` and above is supported.
{% endhint %}

Install Flowise locally using NPM.

1. Install Flowise:

```bash
npm install -g flowise
```

You can also install a specific version. Refer to available [versions](https://www.npmjs.com/package/flowise?activeTab=versions).

```
npm install -g flowise@x.x.x
```

2. Start Flowise:

```bash
npx flowise start
```

3. Open: [http://localhost:3000](http://localhost:3000)

***

## Docker

There are two ways to deploy Flowise with Docker. First, git clone the project: [https://github.com/FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise)

### Docker Compose

1. Go to `docker folder` at the root of the project
2. Copy the `.env.example` file and paste it as another file named `.env`
3. Run:

```bash
docker compose up -d
```

4. Open: [http://localhost:3000](http://localhost:3000)
5. You can bring the containers down by running:

```bash
docker compose stop
```

### Docker Image

1. Build the image:

```bash
docker build --no-cache -t flowise .
```

2. Run image:

```bash
docker run -d --name flowise -p 3000:3000 flowise
```

3. Stop image:

```bash
docker stop flowise
```

***

## For Developers

Flowise has 4 different modules in a single mono repository:

* **Server**: Node backend to serve API logics
* **UI**: React frontend
* **Components**: Integration components
* **Api Documentation**: Swagger spec for Flowise APIs

### Prerequisite

Install [PNPM](https://pnpm.io/installation).

```bash
npm i -g pnpm
```

### Setup 1

Simple setup using PNPM:

1. Clone the repository

```bash
git clone https://github.com/FlowiseAI/Flowise.git
```

2. Go into repository folder

```bash
cd Flowise
```

3. Install all dependencies of all modules:

```bash
pnpm install
```

4. Build the code:

```bash
pnpm build
```

Start the app at [http://localhost:3000](http://localhost:3000)

```bash
pnpm start
```

### Setup 2

Step-by-step setup for project contributors:

1. Fork the official [Flowise Github Repository](https://github.com/FlowiseAI/Flowise)
2. Clone your forked repository
3. Create a new branch, see [guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository). Naming conventions:
   * For feature branch: `feature/<Your New Feature>`
   * For bug fix branch: `bugfix/<Your New Bugfix>`.
4. Switch to the branch you just created
5. Go into repository folder:

```bash
cd Flowise
```

6. Install all dependencies of all modules:

```bash
pnpm install
```

7. Build the code:

```bash
pnpm build
```

8. Start the app at [http://localhost:3000](http://localhost:3000)

```bash
pnpm start
```

9. For development build:

* Create `.env` file and specify the `PORT` (refer to `.env.example`) in `packages/ui`
* Create `.env` file and specify the `PORT` (refer to `.env.example`) in `packages/server`

```bash
pnpm dev
```

* Any changes made in `packages/ui` or `packages/server` will be reflected at [http://localhost:8080](http://localhost:8080/)
* For changes made in `packages/components`, you will need to build again to pickup the changes
*   After making all the changes, run:

    ```bash
    pnpm build
    ```

    and

    ```bash
    pnpm start
    ```

    to make sure everything works fine in production.

***

## For Enterprise

Before starting the app, enterprise users are required to fill in the values for Enterprise Parameters in the `.env` file. Refer to `.env.example` for the required changes.

Reach out to support@flowiseai.com for the value of following env variables:

```
LICENSE_URL
FLOWISE_EE_LICENSE_KEY
```

***

## Learn More

In this video tutorial, Leon provides an introduction to Flowise and explains how to set it up on your local machine.

{% embed url="https://youtu.be/nqAK_L66sIQ" %}

## Community Guide

* [Introduction to \[Practical\] Building LLM Applications with Flowise / LangChain](https://volcano-ice-cd6.notion.site/Introduction-to-Practical-Building-LLM-Applications-with-Flowise-LangChain-03d6d75bfd20495d96dfdae964bea5a5)
* [Flowise / LangChainによるLLMアプリケーション構築\[実践\]入門](https://volcano-ice-cd6.notion.site/Flowise-LangChain-LLM-e106bb0f7e2241379aad8fa428ee064a)



===== configuration/README.md =====

---
description: Learn how to set up and run Flowise instances
---

# Configuration

***

This section will guide you through various configuration options to customize your Flowise instances for development, testing, and production environments.

We'll also provide in-depth guides for deploying Flowise on different Platform as a Service (PaaS) options, ensuring a smooth and successful deployment.

## Guides

* [Auth](authorization/)
* [Databases](databases.md)
* [Deployment](deployment/)
* [Environment Variables](environment-variables.md)
* [Rate Limit](rate-limit.md)
* [Proxy](running-flowise-behind-company-proxy.md)
* [SSO](sso.md)
* [Queue Mode](running-flowise-using-queue.md)
* [Production Ready](running-in-production.md)



===== configuration/environment-variables.md =====

---
description: Learn how to configure environment variables for Flowise
---

# Environment Variables

Flowise support different environment variables to configure your instance. You can specify the following variables in the `.env` file inside `packages/server` folder. Refer to [.env.example](https://github.com/FlowiseAI/Flowise/blob/main/packages/server/.env.example) file.

<table><thead><tr><th width="233">Variable</th><th width="219">Description</th><th width="104">Type</th><th>Default</th></tr></thead><tbody><tr><td>PORT</td><td>The HTTP port Flowise runs on</td><td>Number</td><td>3000</td></tr><tr><td>FLOWISE_FILE_SIZE_LIMIT</td><td>Maximum file size when uploading</td><td>String</td><td><code>50mb</code></td></tr><tr><td>NUMBER_OF_PROXIES</td><td>Rate Limit Proxy</td><td>Number</td><td></td></tr><tr><td>CORS_ORIGINS</td><td>The allowed origins for all cross-origin HTTP calls</td><td>String</td><td></td></tr><tr><td>IFRAME_ORIGINS</td><td>The allowed origins for iframe src embedding</td><td>String</td><td></td></tr><tr><td>SHOW_COMMUNITY_NODES</td><td>Display nodes that are created by community</td><td>Boolean: <code>true</code> or <code>false</code></td><td></td></tr><tr><td>DISABLED_NODES</td><td>Comma separated list of node names to disable</td><td>String</td><td></td></tr></tbody></table>

## For Database

| Variable           | Description                                                      | Type                                       | Default                  |
| ------------------ | ---------------------------------------------------------------- | ------------------------------------------ | ------------------------ |
| DATABASE\_TYPE     | Type of database to store the flowise data                       | Enum String: `sqlite`, `mysql`, `postgres` | `sqlite`                 |
| DATABASE\_PATH     | Location where database is saved (When DATABASE\_TYPE is sqlite) | String                                     | `your-home-dir/.flowise` |
| DATABASE\_HOST     | Host URL or IP address (When DATABASE\_TYPE is not sqlite)       | String                                     |                          |
| DATABASE\_PORT     | Database port (When DATABASE\_TYPE is not sqlite)                | String                                     |                          |
| DATABASE\_USER     | Database username (When DATABASE\_TYPE is not sqlite)            | String                                     |                          |
| DATABASE\_PASSWORD | Database password (When DATABASE\_TYPE is not sqlite)            | String                                     |                          |
| DATABASE\_NAME     | Database name (When DATABASE\_TYPE is not sqlite)                | String                                     |                          |
| DATABASE\_SSL      | Database SSL is required (When DATABASE\_TYPE is not sqlite)     | Boolean: `true` or `false`                 | `false`                  |

## For Storage

Flowise store the following files under a local path folder by default.

* Files uploaded on [Document Loaders](../integrations/langchain/document-loaders/)/Document Store
* Image/Audio uploads from chat
* Images/Files from Assistant
* Files from [Vector Upsert API](/broken/pages/F2AfRpI7qYixNiBWpmIe#vector-upsert-api)

User can specify `STORAGE_TYPE` to use AWS S3, Google Cloud Storage or local path

| Variable                               | Description                                                                      | Type                              | Default                          |
| -------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------- | -------------------------------- |
| STORAGE\_TYPE                          | Type of storage for uploaded files. default is `local`                           | Enum String: `s3`, `gcs`, `local` | `local`                          |
| BLOB\_STORAGE\_PATH                    | Local folder path where uploaded files are stored when `STORAGE_TYPE` is `local` | String                            | `your-home-dir/.flowise/storage` |
| S3\_STORAGE\_BUCKET\_NAME              | Bucket name to hold the uploaded files when `STORAGE_TYPE` is `s3`               | String                            |                                  |
| S3\_STORAGE\_ACCESS\_KEY\_ID           | AWS Access Key                                                                   | String                            |                                  |
| S3\_STORAGE\_SECRET\_ACCESS\_KEY       | AWS Secret Key                                                                   | String                            |                                  |
| S3\_STORAGE\_REGION                    | Region for S3 bucket                                                             | String                            |                                  |
| S3\_ENDPOINT\_URL                      | Custom S3 endpoint (optional)                                                    | String                            |                                  |
| S3\_FORCE\_PATH\_STYLE                 | Force S3 path style (optional)                                                   | Boolean                           | false                            |
| GOOGLE\_CLOUD\_STORAGE\_CREDENTIAL     | Google Cloud Service Account Key                                                 | String                            |                                  |
| GOOGLE\_CLOUD\_STORAGE\_PROJ\_ID       | Google Cloud Project ID                                                          | String                            |                                  |
| GOOGLE\_CLOUD\_STORAGE\_BUCKET\_NAME   | Google Cloud Storage Bucket Name                                                 | String                            |                                  |
| GOOGLE\_CLOUD\_UNIFORM\_BUCKET\_ACCESS | Type of Access                                                                   | Boolean                           | true                             |

## For Debugging and Logs

| Variable   | Description                         | Type                                             |                                |
| ---------- | ----------------------------------- | ------------------------------------------------ | ------------------------------ |
| DEBUG      | Print logs from components          | Boolean                                          |                                |
| LOG\_PATH  | Location where log files are stored | String                                           | `Flowise/packages/server/logs` |
| LOG\_LEVEL | Different levels of logs            | Enum String: `error`, `info`, `verbose`, `debug` | `info`                         |

`DEBUG`: if set to true, will print logs to terminal/console:

<figure><img src="../.gitbook/assets/image (3) (3) (1).png" alt=""><figcaption></figcaption></figure>

`LOG_LEVEL`: Different log levels for loggers to be saved. Can be `error`, `info`, `verbose`, or `debug.` By default it is set to `info,` only `logger.info` will be saved to the log files. If you want to have complete details, set to `debug`.

<figure><img src="../.gitbook/assets/image (2) (4).png" alt=""><figcaption><p><strong>server-requests.log.jsonl - logs every request sent to Flowise</strong></p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (4) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption><p><strong>server.log - logs general actions on Flowise</strong></p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (5) (4).png" alt=""><figcaption><p><strong>server-error.log - logs error with stack trace</strong></p></figcaption></figure>

### Logs Streaming S3

When `STORAGE_TYPE` env variable is set to `s3` , logs will be automatically streamed and stored to S3. New log file will be created hourly, enabling easier debugging.

### Logs Streaming GCS

When `STORAGE_TYPE` env variable is set to `gcs` , logs will be automatically streamed to Google [Cloud Logging](https://cloud.google.com/logging?hl=en).

## For Credentials

Flowise store your third party API keys as encrypted credentials using an encryption key.

By default, a random encryption key will be generated when starting up the application and stored under a file path. This encryption key is then retrieved everytime to decrypt the credentials used within a chatflow. For example, your OpenAI API key, Pinecone API key, etc.

You can configure to use AWS Secret Manager to store the encryption key instead.

| Variable                      | Description                                           | Type                        | Default                   |
| ----------------------------- | ----------------------------------------------------- | --------------------------- | ------------------------- |
| SECRETKEY\_STORAGE\_TYPE      | How to store the encryption key                       | Enum String: `local`, `aws` | `local`                   |
| SECRETKEY\_PATH               | Local file path where encryption key is saved         | String                      | `Flowise/packages/server` |
| FLOWISE\_SECRETKEY\_OVERWRITE | Encryption key to be used instead of the existing key | String                      |                           |
| SECRETKEY\_AWS\_ACCESS\_KEY   |                                                       | String                      |                           |
| SECRETKEY\_AWS\_SECRET\_KEY   |                                                       | String                      |                           |
| SECRETKEY\_AWS\_REGION        |                                                       | String                      |                           |

For some reasons, sometimes encryption key might be re-generated or the stored path was changed, this will cause errors like - <mark style="color:red;">Credentials could not be decrypted.</mark>

To avoid this, you can set your own encryption key as `FLOWISE_SECRETKEY_OVERWRITE`, so that the same encryption key will be used everytime. There is no restriction on the format, you can set it as any text that you want, or the same as your `FLOWISE_PASSWORD`.

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Credential API Key returned from the UI is not the same length as your original Api Key that you have set. This is a fake prefix string that prevents network spoofing, that's why we are not returning the Api Key back to UI. However, the correct Api Key will be retrieved and used during your interaction with the chatflow.
{% endhint %}

## For Models

In some cases, you might want to use custom model on the existing Chat Model and LLM nodes, or restrict access to only certain models.

By default, Flowise pulls the model list from [here](https://github.com/FlowiseAI/Flowise/blob/main/packages/components/models.json). However user can create their own `models.json` file and specify the file path:

<table><thead><tr><th width="164">Variable</th><th width="196">Description</th><th width="78">Type</th><th>Default</th></tr></thead><tbody><tr><td>MODEL_LIST_CONFIG_JSON</td><td>Link to load list of models from your <code>models.json</code> config file</td><td>String</td><td><a href="https://raw.githubusercontent.com/FlowiseAI/Flowise/main/packages/components/models.json">https://raw.githubusercontent.com/FlowiseAI/Flowise/main/packages/components/models.json</a></td></tr></tbody></table>

## For Built-In and External Dependencies

There are certain nodes/features within Flowise that allow user to run Javascript code. For security reasons, by default it only allow certain dependencies. It's possible to lift that restriction for built-in and external modules by setting the following environment variables:

<table><thead><tr><th>Variable</th><th width="300.4444580078125">Description</th><th></th></tr></thead><tbody><tr><td>TOOL_FUNCTION_BUILTIN_DEP</td><td>NodeJS built-in modules to be used</td><td>String</td></tr><tr><td>TOOL_FUNCTION_EXTERNAL_DEP</td><td>External modules to be used </td><td>String</td></tr><tr><td>ALLOW_BUILTIN_DEP</td><td>Allow project dependencies to be used such as <code>cheerio</code>, <code>typeorm</code></td><td>Boolean</td></tr></tbody></table>

{% code title=".env" %}
```bash
# Allows usage of all builtin modules
TOOL_FUNCTION_BUILTIN_DEP=*

# Allows usage of only fs
TOOL_FUNCTION_BUILTIN_DEP=fs

# Allows usage of only crypto and fs
TOOL_FUNCTION_BUILTIN_DEP=crypto,fs

# Allow usage of external npm modules.
TOOL_FUNCTION_EXTERNAL_DEP=cheerio,typeorm

ALLOW_BUILTIN_DEP=true
```
{% endcode %}

### Using Built In Dependencies

{% hint style="warning" %}
Some built-in dependencies, such as Puppeteer, may introduce potential security vulnerabilities. It is recommended to analyze and assess these risks carefully before using them.
{% endhint %}

### NodeVM Execution Error: VMError: Cannot find module

If you are using library that is not allowed by default, you can either:

1. Allow all project's [libraries/dependencies](https://github.com/FlowiseAI/Flowise/blob/main/packages/components/src/utils.ts#L52): `ALLOW_BUILTIN_DEP=true`
2. (Recommended) Specifically allow certain libraries/dependencies: `TOOL_FUNCTION_EXTERNAL_DEP=cheerio,typeorm`

## Security Configuration

<table><thead><tr><th width="246.4444580078125">Variable</th><th width="180.4444580078125">Description</th><th width="192.666748046875">Options</th><th>Default</th></tr></thead><tbody><tr><td><code>HTTP_DENY_LIST</code></td><td>Blocks HTTP requests to specified URLs or domains in MCP servers</td><td>Comma-separated URLs/domains</td><td><em>(empty)</em></td></tr><tr><td><code>CUSTOM_MCP_SECURITY_CHECK</code></td><td>Enables comprehensive security validation for Custom MCP configurations</td><td><code>true</code> | <code>false</code></td><td><code>true</code></td></tr><tr><td><code>CUSTOM_MCP_PROTOCOL</code></td><td>Sets the default protocol for Custom MCP communication</td><td><code>stdio</code> | <code>sse</code></td><td><code>stdio</code></td></tr></tbody></table>

#### `CUSTOM_MCP_SECURITY_CHECK=true`

By default, this is enabled. When enabled, applies the following security validations:

* **Command Allowlist**: Only permits safe commands (`node`, `npx`, `python`, `python3`, `docker`)
* **Argument Validation**: Blocks dangerous file paths, directory traversal, and executable files
* **Injection Prevention**: Prevents shell metacharacters and command chaining
* **Environment Protection**: Blocks modification of critical environment variables (PATH, LD\_LIBRARY\_PATH)

#### `CUSTOM_MCP_PROTOCOL`

* **`stdio`**: Direct process communication (default, requires command execution)
* **`sse`**: Server-Sent Events over HTTP (recommended for production, more secure)

### Recommended Production Settings

```bash
# Enable security validation (default)
CUSTOM_MCP_SECURITY_CHECK=true

# Use SSE protocol for better security
CUSTOM_MCP_PROTOCOL=sse

# Block dangerous domains (example)
HTTP_DENY_LIST=localhost,127.0.0.1,internal.company.com

# Blocks a hardcoded list of dangerous domains by default, but can be set to false to disable
HTTP_SECURITY_CHECK=true

# Enables checks on provided file and folder paths to prevent path traversal attacks
PATH_TRAVERSAL_SAFETY=true
```

{% hint style="warning" %}
**Warning**: Disabling `CUSTOM_MCP_SECURITY_CHECK` allows arbitrary command execution and poses significant security risks in production environments.

`HTTP_SECURITY_CHECK` enables a built-in security feature that blocks a hardcoded list of dangerous domains. It is `true` by default and can be disabled by setting it to `false`.

`HTTP_DENY_LIST` allows you to specify an additional, custom list of domains to block. This list is empty by default.

`PATH_TRAVERSAL_SAFETY` enables a built-in security feature to prevent path traversal attacks on file and folder paths. It is `true` by default and can be disabled by setting it to `false`.
{% endhint %}

## Examples of how to set environment variables

### NPM

You can set all these variables when running Flowise using npx. For example:

```
npx flowise start --PORT=3000 --DEBUG=true
```

### Docker

```
docker run -d -p 5678:5678 flowise \
 -e DATABASE_TYPE=postgresdb \
 -e DATABASE_PORT=<POSTGRES_PORT> \
 -e DATABASE_HOST=<POSTGRES_HOST> \
 -e DATABASE_NAME=<POSTGRES_DATABASE_NAME> \
 -e DATABASE_USER=<POSTGRES_USER> \
 -e DATABASE_PASSWORD=<POSTGRES_PASSWORD> \
```

### Docker Compose

You can set all these variables in the `.env` file inside `docker` folder. Refer to [.env.example](https://github.com/FlowiseAI/Flowise/blob/main/docker/.env.example) file.



===== configuration/running-in-production.md =====

# Running in Production

## Mode

When running in production, we highly recommend using [Queue](running-flowise-using-queue.md) mode with the following settings:

* 2 main servers with load balancing, each starting from 4vCPU 8GB RAM
* 4 workers, each starting from 4vCPU 8GB RAM

You can configure auto scaling depending on the traffic and volume.

## Database

By default, Flowise will use SQLite as the database. However when running at scale, its recommended to use PostgresQL.

## Storage

Currently Flowise only supports [AWS S3](https://aws.amazon.com/s3/) with plan to support more blob storage providers. This will allow files and logs to be stored on S3, instead of local file path. Refer [#for-storage](environment-variables.md#for-storage "mention")

## Encryption

Flowise uses an encryption key to encrypt/decrypt credentials you use such as OpenAI API keys. [AWS Secret Manager](https://aws.amazon.com/secrets-manager/) is recommended to be used in production for better security control and key rotation. Refer [#for-credentials](environment-variables.md#for-credentials "mention")

## Rate Limit

When deployed to cloud/on-prem, most likely the instances are behind a proxy/load balancer. The IP address of the request might be the IP of the load balancer/reverse proxy, making the rate limiter effectively a global one and blocking all requests once the limit is reached or `undefined`. Setting the correct `NUMBER_OF_PROXIES` can resolve the issue. Refer [#rate-limit-setup](rate-limit.md#rate-limit-setup "mention")

## Load Testing

Artillery can be used to load testing your deployed Flowise application. Example script can be found [here](https://github.com/FlowiseAI/Flowise/blob/main/artillery-load-test.yml).

## Security

Refer to [#security-configuration](environment-variables.md#security-configuration "mention")



===== configuration/deployment/render.md =====

---
description: Learn how to deploy Flowise on Render
---

# Render

***

1. Fork [Flowise Official Repository](https://github.com/FlowiseAI/Flowise)
2. Visit your github profile to assure you have successfully made a fork
3. Sign in to [Render](https://dashboard.render.com)
4. Click **New +**

<figure><img src="../../.gitbook/assets/render/1.png" alt="" width="563"><figcaption></figcaption></figure>

5. Select **Web Service**

<figure><img src="../../.gitbook/assets/render/2.png" alt=""><figcaption></figcaption></figure>

6. Connect Your GitHub Account
7. Select your forked Flowise repo and click **Connect**

<figure><img src="../../.gitbook/assets/render/3.png" alt="" width="563"><figcaption></figcaption></figure>

8. Fill in your preferred **Name** and **Region.**
9. Select `Docker` as your **Runtime**

<figure><img src="../../.gitbook/assets/render/4.png" alt=""><figcaption></figcaption></figure>

9. Select an **Instance**

<figure><img src="../../.gitbook/assets/render/5.png" alt=""><figcaption></figcaption></figure>

10. _(Optional)_ Add app level authorization, click **Advanced** and add `Environment Variable`

* FLOWISE\_USERNAME
* FLOWISE\_PASSWORD

<figure><img src="../../.gitbook/assets/render/6.png" alt=""><figcaption></figcaption></figure>

Add `NODE_VERSION` with value `18.18.1` as the node version to run the instance.

There are list of env variables you can configure. Refer to [environment-variables.md](../environment-variables.md "mention")

11. Click **Create Web Service**

<figure><img src="../../.gitbook/assets/render/7.png" alt=""><figcaption></figcaption></figure>

12. Navigate to the deployed URL and that's it [🚀](https://emojipedia.org/rocket/)[🚀](https://emojipedia.org/rocket/)

<figure><img src="../../.gitbook/assets/render/8.png" alt=""><figcaption></figcaption></figure>

## Persistent Disk

The default filesystem for services running on Render is ephemeral. Flowise data isn’t persisted across deploys and restarts. To solve this issue, we can use [Render Disk](https://render.com/docs/disks).

1. On the left hand side bar, click **Disks**
2. Name your disk, and specify the **Mount Path** to `/opt/render/.flowise`

<figure><img src="../../.gitbook/assets/render/9.png" alt=""><figcaption></figcaption></figure>

3. Click the **Environment** section, and add these new environment variables:

* HOST - `0.0.0.0`
* DATABASE\_PATH - `/opt/render/.flowise`
* APIKEY\_PATH - `/opt/render/.flowise`
* LOG\_PATH - `/opt/render/.flowise/logs`
* SECRETKEY\_PATH - `/opt/render/.flowise`
* BLOB\_STORAGE\_PATH - `/opt/render/.flowise/storage`

<figure><img src="../../.gitbook/assets/image (1) (5).png" alt=""><figcaption></figcaption></figure>

4. Click **Manual Deploy** then select **Clear build cache & deploy**

<figure><img src="../../.gitbook/assets/render/11.png" alt=""><figcaption></figcaption></figure>

5. Now try creating a flow and save it in Flowise. Then try restarting service or redeploy, you should still be able to see the flow you have saved previously.

Watch how to deploy to Render

{% embed url="https://youtu.be/Fxyc6-frgrI" %}

{% embed url="https://youtu.be/l-0NzOMeCco" %}



===== contributing/building-node.md =====

# Building Node

### Install Git

First, install Git and clone Flowise repository. You can follow the steps from the [Get Started](/broken/pages/nuiTj70UthEELOvhLrSb#for-developers) guide.

### Structure

Flowise separate every node integration under the folder `packages/components/nodes`. Let's try to create a simple Tool!

### Create Calculator Tool

Create a new folder named `Calculator` under the `packages/components/nodes/tools` folder. Then create a new file named `Calculator.ts`. Inside the file, we will first write the base class.

```javascript
import { INode } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'

class Calculator_Tools implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    author: string
    baseClasses: string[]

    constructor() {
        this.label = 'Calculator'
        this.name = 'calculator'
        this.version = 1.0
        this.type = 'Calculator'
        this.icon = 'calculator.svg'
        this.category = 'Tools'
        this.author = 'Your Name'
        this.description = 'Perform calculations on response'
        this.baseClasses = [this.type, ...getBaseClasses(Calculator)]
    }
}

module.exports = { nodeClass: Calculator_Tools }
```

Every node will implements the `INode` base class. Breakdown of what each property means:

<table><thead><tr><th width="271">Property</th><th>Description</th></tr></thead><tbody><tr><td>label</td><td>The name of the node that appears on the UI</td></tr><tr><td>name</td><td>The name that is used by code. Must be <strong>camelCase</strong></td></tr><tr><td>version</td><td>Version of the node</td></tr><tr><td>type</td><td>Usually the same as label. To define which node can be connected to this specific type on UI</td></tr><tr><td>icon</td><td>Icon of the node</td></tr><tr><td>category</td><td>Category of the node</td></tr><tr><td>author</td><td>Creator of the node</td></tr><tr><td>description</td><td>Node description</td></tr><tr><td>baseClasses</td><td>The base classes from the node, since a node can extends from a base component. Used to define which node can be connected to this node on UI</td></tr></tbody></table>

### Define Class

Now the component class is partially finished, we can go ahead to define the actual Tool class, in this case - `Calculator`.

Create a new file under the same `Calculator` folder, and named as `core.ts`

```javascript
import { Parser } from "expr-eval"
import { Tool } from "@langchain/core/tools"

export class Calculator extends Tool {
    name = "calculator"
    description = `Useful for getting the result of a math expression. The input to this tool should be a valid mathematical expression that could be executed by a simple calculator.`
 
    async _call(input: string) {
        try {
            return Parser.evaluate(input).toString()
        } catch (error) {
            return "I don't know how to do that."
        }
    }
}
```

### Finishing

Head back to the `Calculator.ts` file, we can finish this up by having the `async init` function. In this function, we will initialize the Calculator class we created above. When the flow is being executed, the `init` function in each node will be called, and the `_call` function will be executed when LLM decides to call this tool.

```javascript
import { INode } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'
import { Calculator } from './core'

class Calculator_Tools implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    author: string
    baseClasses: string[]

    constructor() {
        this.label = 'Calculator'
        this.name = 'calculator'
        this.version = 1.0
        this.type = 'Calculator'
        this.icon = 'calculator.svg'
        this.category = 'Tools'
        this.author = 'Your Name'
        this.description = 'Perform calculations on response'
        this.baseClasses = [this.type, ...getBaseClasses(Calculator)]
    }
    
 
    async init() {
        return new Calculator()
    }
}

module.exports = { nodeClass: Calculator_Tools }
```

### Build and Run

In the `.env` file inside `packages/server`, create a new env variable:

```javascript
SHOW_COMMUNITY_NODES=true
```

Now we can use `pnpm build` and `pnpm start` to bring the component alive!

<figure><img src="../.gitbook/assets/image (1) (1) (1) (2).png" alt=""><figcaption></figcaption></figure>



===== using-flowise/README.md =====

---
description: Learn about some core functionalities built into Flowise
---

# Using Flowise

***

This section provides in-depth guides on core Flowise functionalities.

## Guides

* [Agentflow V2](agentflowv2.md)
* [Agentflow V1 (Deprecating)](agentflowv1/)
  * [Multi-Agents](agentflowv1/multi-agents.md)
  * [Sequential Agents](agentflowv1/sequential-agents/)
* [Prediction](prediction.md)
* [Streaming](streaming.md)
* [Document Stores](document-stores.md)
* [Upsertion](upsertion.md)
* [Analytic](broken-reference/)
* [Monitoring](monitoring.md)
* [Embed](embed.md)
* [Uploads](uploads.md)
* [Variables](variables.md)
* [Workspaces](workspaces.md)
* [Evaluations](evaluations.md)



===== using-flowise/agentflowv2.md =====

---
description: Learn how to build multi-agents system using Agentflow V2, written by @toi500
---

# Agentflow V2

This guide explores the AgentFlow V2 architecture, detailing its core concepts, use cases, Flow State, and comprehensive node references.

{% hint style="warning" %}
**Disclaimer:** This documentation describes AgentFlow V2 as of its current official release. Features, functionalities, and node parameters are subject to change in future updates and versions of Flowise. Please refer to the latest official release notes or in-app information for the most up-to-date details.
{% endhint %}

{% embed url="https://youtu.be/-h4WQuzRHhI?si=jKkhueFIw06aO6Ge" %}

## Core Concept

AgentFlow V2 represents a significant architectural evolution, introducing a new paradigm in Flowise that focuses on explicit workflow orchestration and enhanced flexibility. Unlike V1's primary reliance on external frameworks for its core agent graph logic, V2 shifts the focus towards designing the entire workflow using a granular set of specialized, standalone nodes developed natively as core Flowise components.

In this V2 architecture, each node functions as an independent unit, executing a discrete operation based on its specific design and configuration. The visual connections between nodes on the canvas explicitly define the workflow's path and control sequence, data can be passed between nodes by referencing the outputs of any previously executed node in the current flow, and the Flow State provides an explicit mechanism for managing and sharing data throughout the workflow.

V2 architecture implements a comprehensive node-dependency and execution queue system that precisely respects these defined pathways while maintaining clear separation between components, allowing workflows to become both more sophisticated and easier to design. This allow complex patterns like loops, conditional branching, human-in-the-loop interactions and others to be achievable. This makes it more adaptable to diverse use cases while remaining more maintainable and extensible.

<div data-full-width="false"><figure><img src="../.gitbook/assets/agentflowv2/patterns.png" alt=""><figcaption></figcaption></figure></div>

## Difference between Agentflow and Automation Platform

One of the most asked question: What is the difference between Agentflow and automation platforms like n8n, Make, or Zapier?

### 💬 **Agent-to-agent Communication**

Multimodal communication between agents is supported. A Supervisor agent can formulate and delegate tasks to multiple Worker agents, with outputs from the Worker agents subsequently returned to the Supervisor.

At each step, agents have access to the complete conversation history, enabling the Supervisor to determine the next task and the Worker agents to interpret the task, select appropriate tools, and execute actions accordingly.

This architecture enables **collaboration, delegation, and shared task management** across multiple agents, such capabilities are not typically offered by traditional automation tools.

<figure><picture><source srcset="../.gitbook/assets/Screenshot 2025-05-16 153946.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""></picture><figcaption></figcaption></figure>

### 🙋‍♂ Human-in-the-loop

Execution is paused while awaiting human input, without blocking the running thread. Each checkpoint is saved, allowing the workflow to resume from the same point even after an application restart.

The use of checkpoints enables **long-running, stateful agents**.

Agents can also be configured to **request permission before executing tools**, similar to how Claude asks for user approval before using MCP tools. This helps prevent the autonomous execution of sensitive actions without explicit user approval.

<figure><picture><source srcset="../.gitbook/assets/Screenshot 2025-05-16 154908.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""></picture><figcaption></figcaption></figure>

### 📖  Shared State

Shared state enables data exchange between agents, especially useful for passing data across branches or non-adjacent steps in a flow. Refer to [#understanding-flow-state](agentflowv2.md#understanding-flow-state "mention")

### ⚡ Streaming

Supports Server-Sent Events (SSE) for real-time streaming of LLM or agent responses. Streaming also enables subscription to execution updates as the workflow progresses.

<figure><img src="../.gitbook/assets/longGIF.gif" alt=""><figcaption></figcaption></figure>

### 🌐 MCP Tools

While traditional automation platforms often feature extensive libraries of pre-built integrations, Agentflow allows MCP ([Model Context Protocol](https://github.com/modelcontextprotocol)) tools to be connected as part of the workflow, rather than functioning solely as agent tools.

Custom MCPs can also be created independently, without depending on platform-provided integrations. MCP is widely considered an industry standard and is typically supported and maintained by the official providers. For example, the GitHub MCP is developed and maintained by the GitHub team, with similar support provided for Atlassian Jira, Brave Search, and others.

<figure><picture><source srcset="../.gitbook/assets/Screenshot 2025-05-16 160752.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""></picture><figcaption></figcaption></figure>

## Agentflow V2 Node Reference

This section provides a detailed reference for each available node, outlining its specific purpose, key configuration parameters, expected inputs, generated outputs, and its role within the AgentFlow V2 architecture.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-01-d (1).png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-all-nodes.png" alt=""></picture><figcaption></figcaption></figure>

***

### **1. Start Node**

The designated entry point for initiating any AgentFlow V2 workflow execution. Every flow must begin with this node.

* **Functionality:** Defines how the workflow is triggered and sets up the initial conditions. It can accept input either directly from the chat interface or through a customizable form presented to the user. It also allows for the initialization of `Flow State` variables at the beginning of the execution and can manage how conversation memory is handled for the run.
* **Configuration Parameters**
  * **Input Type**: Determines how the workflow execution is initiated, either by `Chat Input` from the user or via a submitted `Form Input`.
    * **Form Title, Form Description, Form Input Types**: If `Form Input` is selected, these fields configure the appearance of the form presented to the user, allowing for various input field types with defined labels and variable names.
  * **Ephemeral Memory**: If enabled, instructs the workflow to begin the execution without considering any past messages from the conversation thread, effectively starting with a clean memory slate.
  * **Flow State**: Defines the complete set of initial key-value pairs for the workflow's runtime state `$flow.state`. All state keys that will be used or updated by subsequent nodes must be declared and initialized here.
* **Inputs:** Receives the initial data that triggers the workflow, which will be either a chat message or the data submitted through a form.
* **Outputs:** Provides a single output anchor to connect to the first operational node, passing along the initial input data and the initialized Flow State.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-02-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-02.png" alt="" width="343"></picture><figcaption></figcaption></figure>

***

### **2. LLM Node**

Provides direct access to a configured Large Language Model (LLM) for executing AI tasks, enabling the workflow to perform structured data extraction if needed.

* **Functionality:** This node sends requests to an LLM based on provided instructions (Messages) and context. It can be used for text generation, summarization, translation, analysis, answering questions, and generating structured JSON output according to a defined schema. It has access to memory for the conversation thread and can read/write to the `Flow State`.
* **Configuration Parameters**
  * **Model**: Specifies the AI model from a chosen service — e.g., OpenAI's GPT-4o or Google Gemini.
  * **Messages**: Define the conversational input for the LLM, structuring it as a sequence of roles — System, User, Assistant, Developer — to guide the AI's response. Dynamic data can be inserted using `{{ variable }}`.
  * **Memory**: If enabled, determines if the LLM should consider the history of the current conversation thread when generating its response.
    * **Memory Type, Window Size, Max Token Limit**: If memory is used, these settings refine how the conversation history is managed and presented to the LLM — for example, whether to include all messages, only a recent window of turns, or a summarized version.
    * **Input Message**: Specifies the variable or text that will be appended as the most recent user message at the end of the existing conversation context — including initial context and memory — before being processed by the LLM/Agent.
  * **Return Response As**: Configures how the LLM's output is categorized — as a `User Message` or `Assistant Message` — which can influence how it's handled by subsequent memory systems or logging.
  * **JSON Structured Output**: Instructs the LLM to format its output according to a specific JSON schema — including keys, data types, and descriptions — ensuring predictable, machine-readable data.
  * **Update Flow State**: Allows the node to modify the workflow's runtime state `$flow.state` during execution by updating pre-defined keys. This makes it possible, for example, to store this LLM node's output under such a key, making it accessible to subsequent nodes.
* **Inputs:** This node utilizes data from the workflow's initial trigger or from the outputs of preceding nodes, incorporating this data into the `Messages` or `Input Message` fields. It can also retrieve values from `$flow.state` when input variables reference it.
* **Outputs:** Produces the LLM's response, which will be either plain text or a structured JSON object. The categorization of this output — as User or Assistant — is determined by the `Return Response` setting.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-03-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-03.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **3. Agent Node**

Represents an autonomous AI entity capable of reasoning, planning, and interacting with tools or knowledge sources to accomplish a given objective.

* **Functionality:** This node uses an LLM to dynamically decide a sequence of actions. Based on the user's goal — provided via messages/input — it can choose to use available Tools or query Document Stores to gather information or perform actions. It manages its own reasoning cycle and can utilize memory for the conversation thread and `Flow State`. Suitable for tasks requiring multi-step reasoning or interacting dynamically with external systems or tools.
* **Configuration Parameters**
  * **Model**: Specifies the AI model from a chosen service — e.g., OpenAI's GPT-4o or Google Gemini — that will drive the agent's reasoning and decision-making processes.
  * **Messages**: Define the initial conversational input, objective, or context for the agent, structuring it as a sequence of roles — System, User, Assistant, Developer — to guide the agent's understanding and subsequent actions. Dynamic data can be inserted using `{{ variable }}`.
  * **Tools**: Specify which pre-defined Flowise Tools the agent is authorized to use to achieve its goals.
    * For each selected tool, an optional **Require Human Input flag** indicates if the tool's operation might itself pause to ask for human intervention.
  * **Knowledge / Document Stores**: Configure access to information within Flowise-managed Document Stores.
    * **Document Store**: Choose a pre-configured Document Store from which the agent can retrieve information. These stores must be set up and populated in advance.
    * **Describe Knowledge**: Provide a natural language description of the content and purpose of this Document Store. This description guides the agent in understanding what kind of information the store contains and when it would be appropriate to query it.
  * **Knowledge / Vector Embeddings**: Configure access to external, pre-existing vector stores as additional knowledge sources for the agent.
    * **Vector Store**: Selects the specific, pre-configured vector database the agent can query.
    * **Embedding Model**: Specifies the embedding model associated with the selected vector store, ensuring compatibility for queries.
    * **Knowledge Name**: Assigns a short, descriptive name to this vector-based knowledge source, which the agent can use for reference.
    * **Describe Knowledge**: Provide a natural language description of the content and purpose of this vector store, guiding the agent on when and how to utilize this specific knowledge source.
    * **Return Source Documents**: If enabled, instructs the agent to include source document information with the data retrieved from the vector store.
  * **Memory**: If enabled, determines if the agent should consider the history of the current conversation thread when making decisions and generating responses.
    * **Memory Type, Window Size, Max Token Limit**: If memory is used, these settings refine how the conversation history is managed and presented to the agent — for example, whether to include all messages, only a recent window of turns, or a summarized version.
    * **Input Message**: Specifies the variable or text that will be appended as the most recent user message at the end of the existing conversation context — including initial context and memory — before being processed by the LLM/Agent.
  * **Return Response**: Configures how the agent's final output or message is categorized — as a User Message or Assistant Message — which can influence how it's handled by subsequent memory systems or logging.
  * **Update Flow State**: Allows the node to modify the workflow's runtime state `$flow.state` during execution by updating pre-defined keys. This makes it possible, for example, to store this Agent node's output under such a key, making it accessible to subsequent nodes.
* **Inputs:** This node utilizes data from the workflow's initial trigger or from the outputs of preceding nodes, often incorporated into the `Messages` or `Input Message` fields. It accesses the configured tools and knowledge sources as needed.
* **Outputs:** Produces the final result or response generated by the agent after it has completed its reasoning, planning, and any interactions with tools or knowledge sources.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-04-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-04.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **4. Tool Node**

Provides a mechanism for directly and deterministically executing a specific, pre-defined Flowise Tool within the workflow sequence. Unlike the Agent node, where the LLM dynamically chooses a tool based on reasoning, the Tool node executes exactly the tool selected by the workflow designer during configuration.

* **Functionality:** This node is used when the workflow requires the execution of a known, specific capability at a defined point, with readily available inputs. It ensures deterministic action without involving LLM reasoning for tool selection.
* **How it Works**
  1. **Triggering:** When the workflow execution reaches a Tool node, it activates.
  2. **Tool Identification:** It identifies the specific Flowise Tool selected in its configuration.
  3. **Input Argument Resolution:** It looks at the Tool Input Arguments configuration. For each required input parameter of the selected tool.
  4. **Execution:** It invokes the underlying code or API call associated with the selected Flowise Tool, passing the resolved input arguments.
  5. **Output Generation:** It receives the result returned by the tool's execution.
  6. **Output Propagation:** It makes this result available via its output anchor for subsequent nodes to use.
* **Configuration Parameters**
  * **Tool Selection**: Choose the specific, registered Flowise Tool that this node will execute from a dropdown list.
  * **Input Arguments**: Define how data from your workflow is supplied to the selected tool. This section dynamically adapts based on the chosen tool, presenting its specific required input parameters:
    * **Map Argument Name**: For each input the selected tool requires (e.g., `input` for a Calculator), this field will show the expected parameter name as defined by the tool itself.
    * **Provide Argument Value**: Set the value for that corresponding parameter, using a dynamic variable like `{{ previousNode.output }}`, `{{ $flow.state.someKey }}`, or by entering static text.
  * **Update Flow State**: Allows the node to modify the workflow's runtime state `$flow.state` during execution by updating pre-defined keys. This makes it possible, for example, to store this Tool node's output under such a key, making it accessible to subsequent nodes.
* **Inputs:** Receives necessary data for the tool's arguments via the `Input Arguments` mapping, sourcing values from previous node outputs, `$flow.state`, or static configurations.
* **Outputs:** Produces the raw output generated by the executed tool — e.g., a JSON string from an API, a text result, or a numerical value.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-16-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-05.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **5. Retriever Node**

Performs targeted information retrieval from configured Document Stores.

* **Functionality:** This node queries one or more specified Document Stores, fetching relevant document chunks based on semantic similarity. It's a focused alternative to using an Agent node when the only required action is retrieval and dynamic tool selection by an LLM is not necessary.
* **Configuration Parameters**
  * **Knowledge / Document Stores**: Specify which pre-configured and populated Document Store(s) this node should query to find relevant information.
  * **Retriever Query**: Define the text query that will be used to search the selected Document Stores. Dynamic data can be inserted using `{{ variables }}`.
  * **Output Format**: Choose how the retrieved information should be presented — either as plain `Text` or as `Text with Metadata`, which might include details like source document names or locations.
  * **Update Flow State**: Allows the node to modify the workflow's runtime state `$flow.state` during execution by updating pre-defined keys. This makes it possible, for example, to store this Retriever node's output under such a key, making it accessible to subsequent nodes.
* **Inputs:** Requires a query string — often supplied as a variable from a previous step or user input — and accesses the selected Document Stores for information.
* **Outputs:** Produces the document chunks retrieved from the knowledge base, formatted according to the chosen `Output Format`.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-06-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-06.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### 6. HTTP Node

Facilitates direct communication with external web services and APIs via the Hypertext Transfer Protocol (HTTP).

* **Functionality:** This node enables the workflow to interact with any external system accessible via HTTP. It can send various types of requests (GET, POST, PUT, DELETE, PATCH) to a specified URL, allowing for integration with third-party APIs, fetching data from web resources, or triggering external webhooks. The node supports configuration of authentication methods, custom headers, query parameters, and different request body types to accommodate diverse API requirements.
* **Configuration Parameters**
  * **HTTP Credential**: Optionally select pre-configured credentials — such as Basic Auth, Bearer Token, or API Key — to authenticate requests to the target service.
  * **Request Method**: Specify the HTTP method to be used for the request — e.g., `GET`, `POST`, `PUT`, `DELETE`, `PATCH`.
  * **Target URL**: Define the complete URL of the external endpoint to which the request will be sent.
  * **Request Headers**: Set any necessary HTTP headers as key-value pairs to be included in the request.
  * **URL Query Parameters**: Define key-value pairs that will be appended to the URL as query parameters.
  * **Request Body Type**: Choose the format of the request payload if sending data — options include `JSON`, `Raw text`, `Form Data`, or `x-www-form-urlencoded`.
  * **Request Body**: Provide the actual data payload for methods like POST or PUT. The format should match the selected `Body Type`, and dynamic data can be inserted using `{{ variables }}`.
  * **Response Type**: Specify how the workflow should interpret the response received from the server — options include `JSON`, `Text`, `Array Buffer`, or `Base64` for binary data.
* **Inputs:** Receives configuration data such as the URL, method, headers, and body, often incorporating dynamic values from previous workflow steps or `$flow.state`.
* **Outputs:** Produces the response received from the external server, parsed according to the selected `Response Type`.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-07-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-07.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **7. Condition Node**

Implements deterministic branching logic within the workflow based on defined rules.

* **Functionality:** This node acts as a decision point, evaluating one or more specified conditions to direct the workflow down different paths. It compares input values — which can be strings, numbers, or booleans — using a variety of logical operators, such as equals, contains, greater than, or is empty. Based on whether these conditions evaluate to true or false, the workflow execution proceeds along one of the distinct output branches connected to this node.
* **Configuration Parameters**
  * **Conditions**: Configure the set of logical rules the node will evaluate.
    * **Type**: Specify the type of data being compared for this rule — `String`, `Number`, or `Boolean`.
    * **Value 1**: Define the first value for the comparison. Dynamic data can be inserted using `{{ variables }}`.
    * **Operation**: Select the logical operator to apply between Value 1 and Value 2 — e.g., `equal`, `notEqual`, `contains`, `larger`, `isEmpty`.
    * **Value 2**: Define the second value for the comparison, if required by the chosen operation. Dynamic data can also be inserted here using `{{ variables }}`.
* **Inputs:** Requires the data for `Value 1` and `Value 2` for each condition being evaluated. These values are supplied from previous node outputs or retrieved from `$flow.state`.
* **Outputs:** Provides multiple output anchors, corresponding to the boolean outcome (true/false) of the evaluated conditions. The workflow continues along the specific path connected to the output anchor that matches the result.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-08-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-08.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **8. Condition Agent Node**

Provides AI-driven dynamic branching based on natural language instructions and context.

* **Functionality:** This node uses a Large Language Model (LLM) to route the workflow. It analyzes provided input data against a set of user-defined "Scenarios" — potential outcomes or categories — guided by high-level natural language "Instructions" that define the decision-making task. The LLM then determines which scenario best fits the current input context. Based on this AI-driven classification, the workflow execution proceeds down the specific output path corresponding to the chosen scenario. This node is particularly useful for tasks like user intent recognition, complex conditional routing, or nuanced situational decision-making where simple, predefined rules — as in the Condition Node — are insufficient.
* **Configuration Parameters**
  * **Model**: Specifies the AI model from a chosen service that will perform the analysis and scenario classification.
  * **Instructions**: Define the overall goal or task for the LLM in natural language — e.g., "Determine if the user's request is about sales, support, or general inquiry."
  * **Input**: Specify the data, often text from a previous step or user input, using `{{ variables }}`, that the LLM will analyze to make its routing decision.
  * **Scenarios**: Configure an array defining the possible outcomes or distinct paths the workflow can take. Each scenario is described in natural language — e.g., "Sales Inquiry," "Support Request," "General Question" — and each corresponds to a unique output anchor on the node.
* **Inputs:** Requires the `Input` data for analysis and the `Instructions` to guide the LLM.
* **Outputs:** Provides multiple output anchors, one for each defined `Scenario`. The workflow continues along the specific path connected to the output anchor that the LLM determines best matches the input.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-09-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-09.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **9. Iteration Node**

Executes a defined "sub-flow" — a sequence of nodes nested within it — for each item in an input array, implementing a "for-each" loop."

* **Functionality:** This node is designed for processing collections of data. It takes an array, either provided directly or referenced via a variable, as its input. For every individual element within that array, the Iteration Node sequentially executes the sequence of other nodes that are visually placed inside its boundaries on the canvas.
* **Configuration Parameters**
  * **Array Input**: Specifies the input array that the node will iterate over. This is provided by referencing a variable that holds an array from a previous node's output or from the `$flow.state` — e.g., `{{ $flow.state.itemList }}`.
* **Inputs:** Requires an array to be supplied to its `Array Input` parameter.
* **Outputs:** Provides a single output anchor that becomes active only after the nested sub-flow has completed execution for all items in the input array. The data passed through this output can include aggregated results or the final state of variables modified within the loop, depending on the design of the sub-flow. Nodes placed inside the iteration block have their own distinct input and output connections that define the sequence of operations for each item.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-10-d (1).png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-10.png" alt="" width="563"></picture><figcaption></figcaption></figure>

***

### **10. Loop Node**

Explicitly redirects the workflow execution back to a previously executed node.

* **Functionality:** This node enables the creation of cycles or iterative retries within a workflow. When the execution flow reaches the Loop Node, it does not proceed forward to a new node; instead, it "jumps" back to a specified target node that has already been executed earlier in the current workflow run. This action causes the re-execution of that target node and any subsequent nodes in that part of the flow.
* **Configuration Parameters**
  * **Loop Back To**: Selects the unique ID of a previously executed node within the current workflow to which the execution should return.
  * **Max Loop Count**: Defines the maximum number of times this loop operation can be performed within a single workflow execution, safeguarding against infinite cycles. The default value is 5.
* **Inputs:** Receives the execution signal to activate. It internally tracks the number of times the loop has occurred for the current execution.
* **Outputs:** This node does not have a standard forward-pointing output anchor, as its primary function is to redirect the execution flow backward to the `Loop Back To` target node, from where the workflow then continues.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-11-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-11.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **11. Human Input Node**

Pauses the workflow execution to request explicit input, approval, or feedback from a human user — a key component for Human-in-the-Loop (HITL) processes.

* **Functionality:** This node halts the automated progression of the workflow and presents information or a question to a human user, via the chat interface. The content displayed to the user can either be a predefined, static text or dynamically generated by a LLM based on the current workflow context. The user is provided with distinct action choices — e.g., "Proceed," "Reject" — and, if enabled, a field to provide textual feedback. Once the user makes a selection and submits their response, the workflow resumes execution along the specific output path corresponding to their chosen action.
* **Configuration Parameters**
  * **Description Type**: Determines how the message or question presented to the user is generated — either `Fixed` (static text) or `Dynamic` (generated by an LLM).
    * **If Description Type is `Fixed`**
      * **Description**: This field contains the exact text to be displayed to the user. It supports the insertion of dynamic data using `{{ variables }}`
    * **If `Description Type` is `Dynamic`**
      * **Model**: Selects the AI model from a chosen service that will generate the user-facing message.
      * **Prompt**: Provides the instructions or prompt for the selected LLM to generate the message shown to the user.
  * **Feedback:** If enabled, the user will be prompted with a feedback window to leave their feedback, and this feedback will be appended to the node's output.
* **Inputs:** Receives the execution signal to pause the workflow. It can utilize data from previous steps or `$flow.state` through variables in the `Description` or `Prompt` fields if configured for dynamic content.
* **Outputs:** Provides two output anchors, each corresponding to a distinct user action — an anchor for "proceed" and another for "reject". The workflow continues along the path connected to the anchor matching the user's selection.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-12-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-12.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **12. Direct Reply Node**

Sends a final message to the user and terminates the current execution path.

* **Functionality:** This node serves as an endpoint for a specific branch or the entirety of a workflow. It takes a configured message — which can be static text or dynamic content from a variable — and delivers it directly to the end-user through the chat interface. Upon sending this message, the execution along this particular path of the workflow concludes; no further nodes connected from this point will be processed.
* **Configuration Parameters**
  * **Message**: Define the text or variable `{{ variable }}` that holds the content to be sent as the final reply to the user.
* **Inputs:** Receives the message content, which is sourced from a previous node's output or a value stored in `$flow.state`.
* **Outputs:** This node has no output anchors, as its function is to terminate the execution path after sending the reply.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-13-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-13.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **13. Custom Function Node**

Provides a mechanism for executing custom server-side Javascript code within the workflow.

* **Functionality:** This node allows to write and run arbitrary Javascript snippets, offering a efective way to implement complex data transformations, bespoke business logic, or interactions with resources not directly supported by other standard nodes. The executed code operates within a Node.js environment and has specific ways to access data:
  * **Input Variables:** Values passed via the `Input Variables` configuration are accessible within the function, typically prefixed with `$` — e.g., if an input variable `userid` is defined, it can be accessed as `$userid`.
  * **Flow Context:** Default flow configuration variables are available, such as `$flow.sessionId`, `$flow.chatId`, `$flow.chatflowId`, `$flow.input` — the initial input that started the workflow — and the entire `$flow.state` object.
  * **Custom Variables:** Any custom variables set up in Flowise — e.g., `$vars.<variable-name>`.
  * **Libraries:** The function can utilize any libraries that have been imported and made available within the Flowise backend environment.**The function must return a string value at the end of its execution**.
* **Configuration Parameters**
  * **Input Variables**: Configure an array of input definitions that will be passed as variables into the scope of your Javascript function. For each variable you wish to define, you will specify:
    * **Variable Name**: The name you will use to refer to this variable within your Javascript code, typically prefixed with a `$` — e.g., if you enter `myValue` here, you might access it as `$myValue` in the script, corresponding to how input schema properties are mapped.
    * **Variable Value**: The actual data to be assigned to this variable, which can be static text or, more commonly, a dynamic value sourced from the workflow — e.g., `{{ previousNode.output }}` or `{{ $flow.state.someKey }}`.
  * **Javascript Function**: The code editor field where the server-side Javascript function is written. This function must ultimately return a string value.
  * **Update Flow State**: Allows the node to modify the workflow's runtime state `$flow.state` during execution by updating pre-defined keys. This makes it possible, for example, to store this Custom Function node's string output under such a key, making it accessible to subsequent nodes.
* **Inputs:** Receives data through the variables configured in `Input Variables`. Can also implicitly access elements of the `$flow` context and `$vars`.
* **Outputs:** Produces the string value returned by the executed Javascript function.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-14-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-14.png" alt="" width="375"></picture><figcaption></figcaption></figure>

***

### **14. Execute Flow Node**

Enables the invocation and execution of another complete Flowise Chatflow or AgentFlow from within the current workflow.

* **Functionality:** This node functions as a sub-workflow caller, promoting modular design and reusability of logic. It allows the current workflow to trigger a separate, pre-existing workflow — identified by its name or ID within the Flowise instance — pass an initial input to it, optionally override specific configurations of the target flow for that particular run, and then receive its final output back into the calling workflow to continue processing.
* **Configuration Parameters**
  * **Connect Credential**: Optionally provide Chatflow API credentials if the target flow being called requires specific authentication or permissions for execution.
  * **Select Flow**: Specify the particular Chatflow or AgentFlow that this node will execute from the list of available flows in your Flowise instance.
  * **Input**: Define the data — static text or `{{ variable }}` — that will be passed as the primary input to the target workflow when it is invoked.
  * **Override Config**: Optionally provide a JSON object containing parameters that will override the default configuration of the target workflow specifically for this execution instance — e.g., temporarily changing a model or prompt used in the sub-flow.
  * **Base URL**: Optionally specify an alternative base URL for the Flowise instance that hosts the target flow. This is useful in distributed setups or when flows are accessed via different routes, defaulting to the current instance's URL if not set.
  * **Return Response As**: Determine how the final output from the executed sub-flow should be categorized when it's returned to the current workflow — as a `User Message` or `Assistant Message`.
  * **Update Flow State**: Allows the node to modify the workflow's runtime state `$flow.state` during execution by updating pre-defined keys. This makes it possible, for example, to store this Execute Flow node's output under such a key, making it accessible to subsequent nodes.
* **Inputs:** Requires the selection of a target flow and the `Input` data for it.
* **Outputs:** Produces the final output returned by the executed target workflow, formatted according to the `Return Response As` setting.

<figure><picture><source srcset="../.gitbook/assets/agentflowv2/darkmode/v2-15-d.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/agentflowv2/v2-15.png" alt="" width="375"></picture><figcaption></figcaption></figure>

## Understanding Flow State

A key architectural feature enabling the flexibility and data management capabilities of AgentFlow V2 is the **Flow State**. This mechanism provides a way to manage and share data dynamically throughout the execution of a single workflow instance.

### **What is Flow State?**

* Flow State (`$flow.state`) is a **runtime, key-value store** that is shared among the nodes in a single execution.
* It functions as temporary memory or a shared context that exists only for the duration of that particular run/execution.

### **Purpose of Flow State**

The primary purpose of `$flow.state` is to enable **explicit data sharing and communication between nodes, especially those that may not be directly connected** in the workflow graph, or when data needs to be intentionally persisted and modified across multiple steps. It addresses several common orchestration challenges:

1. **Passing Data Across Branches:** If a workflow splits into conditional paths, data generated or updated in one branch can be stored in `$flow.state` to be accessed later if the paths merge or if other branches need that information.
2. **Accessing Data Across Non-Adjacent Steps:** Information initialized or updated by an early node can be retrieved by a much later node without needing to pass it explicitly through every intermediate node's inputs and outputs.

### **How Flow State Works**

1. **Initialization / Declaration of Keys**
   * All state keys that will be used throughout the workflow **must be initialized** with their default (even if empty) values using the `Flow State` parameter within the **Start node**. This step effectively declares the schema or structure of your `$flow.state` for that workflow. You define the initial key-value pairs here.

<figure><picture><source srcset="../.gitbook/assets/Screenshot 2025-05-16 160038.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""></picture><figcaption></figcaption></figure>

2. **Updating State / Modifying Existing Keys**

* Many operational nodes — e.g., `LLM`, `Agent`, `Tool`, `HTTP`, `Retriever`, `Custom Function` — include an `Update Flow State` parameter in their configuration.
* This parameter allows the node to **modify the values of pre-existing keys** within `$flow.state`.
* The value can be static text, the direct output of the current node, output from previous node, and many other variables. Type `{{` will show all the available variables.
* When the node executes successfully, it **updates** the specified key(s) in `$flow.state` with the new value(s). **New keys cannot be created by operational nodes; only pre-defined keys can be updated.**

<figure><picture><source srcset="../.gitbook/assets/Screenshot 2025-05-16 160347.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/Screenshot 2025-05-16 160427.png" alt=""></picture><figcaption></figcaption></figure>

3. **Reading from State**

* Any node input parameter that accepts variables can read values from the Flow State.
* Use the specific syntax: `{{ $flow.state.yourKey }}` — replace `yourKey` with the actual key name that was initialized in the Start Node.
* For example, an LLM node's prompt might include `"...based on the user status: {{ $flow.state.customerStatus }}"`.

<figure><picture><source srcset="../.gitbook/assets/Screenshot 2025-05-16 161711.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/Screenshot 2025-05-16 161605.png" alt=""></picture><figcaption></figcaption></figure>

### **Scope and Persistence:**

* It is created and initialized when a workflow execution begins and is destroyed when that specific execution ends.
* It does **not** persist across different user sessions or separate runs of the same workflow.
* Each concurrent execution of the workflow maintains its own independent `$flow.state`.

## Video Resources

{% embed url="https://youtu.be/SLVVDUIbIBE?si=VU1m_btfDzVNl-PP" %}

{% embed url="https://youtu.be/h9N9wCrP9u4?si=8-9a9fktpxAykXXH" %}



===== using-flowise/prediction.md =====

# Prediction

Prediction API is the primary endpoint for interacting with your Flowise flows and assistants. It allows you to send messages to your selected flow and receive responses back. This API handles the core chat functionality, including:

* **Chat Interactions**: Send questions or messages to your flow and receive AI-generated responses
* **Streaming Responses**: Get real-time streaming responses for better user experience
* **Conversation Memory**: Maintain context across multiple messages within a session
* **File Processing**: Upload and process images, audio, and other files as part of your queries
* **Dynamic Configuration**: Override chatflow settings and pass variables at runtime

For details, see the [Prediction Endpoint API Reference](../api-reference/prediction.md).

## Base URL and Authentication

**Base URL**: `http://localhost:3000` (or your Flowise instance URL)

**Endpoint**: `POST /api/v1/prediction/:id`

**Authentication**: Refer [Authentication for Flows](../configuration/authorization/chatflow-level.md)

## Request Format

#### Basic Request Structure

```json
{
    "question": "Your message here",
    "streaming": false,
    "overrideConfig": {},
    "history": [],
    "uploads": [],
    "form": {}
}
```

#### Parameters

| Parameter        | Type    | Required                    | Description                                 |
| ---------------- | ------- | --------------------------- | ------------------------------------------- |
| `question`       | string  | Yes                         | The message/question to send to the flow    |
| `form`           | object  | Either `question` or `form` | The form object to send to the flow         |
| `streaming`      | boolean | No                          | Enable streaming responses (default: false) |
| `overrideConfig` | object  | No                          | Override flow configuration                 |
| `history`        | array   | No                          | Previous conversation messages              |
| `uploads`        | array   | No                          | Files to upload (images, audio, etc.)       |
| `humanInput`     | object  | No                          | Return human feedback and resume execution  |

## SDK Libraries

Flowise provides official SDKs for Python and TypeScript/JavaScript:

#### Installation

**Python**: `pip install flowise`

**TypeScript/JavaScript**: `npm install flowise-sdk`

#### Python SDK Usage

{% tabs %}
{% tab title="Basic Usage" %}
```python
from flowise import Flowise, PredictionData

# Initialize client
client = Flowise(base_url="http://localhost:3000")

# Non-streaming prediction
try:
    response = client.create_prediction(
        PredictionData(
            chatflowId="your-chatflow-id",
            question="What is machine learning?",
            streaming=False
        )
    )
    
    # Handle response
    for result in response:
        print("Response:", result)
        
except Exception as e:
    print(f"Error: {e}")
```
{% endtab %}

{% tab title="Streaming" %}
```python
from flowise import Flowise, PredictionData

client = Flowise(base_url="http://localhost:3000")

# Streaming prediction
try:
    response = client.create_prediction(
        PredictionData(
            chatflowId="your-chatflow-id",
            question="Tell me a long story about AI",
            streaming=True
        )
    )
    
    # Process streaming chunks
    print("Streaming response:")
    for chunk in response:
        print(chunk, end="", flush=True)
        
except Exception as e:
    print(f"Error: {e}")
```
{% endtab %}

{% tab title="With Configuration" %}
```python
from flowise import Flowise, PredictionData

client = Flowise(base_url="http://localhost:3000")

# Advanced configuration
try:
    response = client.create_prediction(
        PredictionData(
            chatflowId="your-chatflow-id",
            question="Analyze this data",
            streaming=False,
            overrideConfig={
                "sessionId": "user-session-123",
                "temperature": 0.7,
                "maxTokens": 500,
                "returnSourceDocuments": True
            }
        )
    )
    
    for result in response:
        print("Response:", result)
        
except Exception as e:
    print(f"Error: {e}")
```
{% endtab %}
{% endtabs %}

#### TypeScript/JavaScript SDK Usage

{% tabs %}
{% tab title="Basic Usage" %}
```typescript
import { FlowiseClient } from 'flowise-sdk';

// Initialize client
const client = new FlowiseClient({ 
    baseUrl: 'http://localhost:3000' 
});

// Non-streaming prediction
async function chatWithFlow() {
    try {
        const response = await client.createPrediction({
            chatflowId: 'your-chatflow-id',
            question: 'What is machine learning?',
            streaming: false
        });
        
        console.log('Response:', response);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

chatWithFlow();
```
{% endtab %}

{% tab title="Streaming" %}
```typescript
import { FlowiseClient } from 'flowise-sdk';

const client = new FlowiseClient({ 
    baseUrl: 'http://localhost:3000' 
});

// Streaming prediction
async function streamingChat() {
    try {
        const stream = await client.createPrediction({
            chatflowId: 'your-chatflow-id',
            question: 'Tell me a long story about AI',
            streaming: true
        });
        
        console.log('Streaming response:');
        for await (const chunk of stream) {
            process.stdout.write(chunk);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

streamingChat();
```
{% endtab %}

{% tab title="With Configuration" %}
```typescript
import { FlowiseClient } from 'flowise-sdk';

const client = new FlowiseClient({ 
    baseUrl: 'http://localhost:3000' 
});

// Advanced configuration
async function advancedChat() {
    try {
        const response = await client.createPrediction({
            chatflowId: 'your-chatflow-id',
            question: 'Analyze this data',
            streaming: false,
            overrideConfig: {
                sessionId: 'user-session-123',
                temperature: 0.7,
                maxTokens: 500,
                returnSourceDocuments: true
            }
        });
        
        console.log('Response:', response);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

advancedChat();
```
{% endtab %}
{% endtabs %}

## Direct HTTP API Usage

If you prefer to use the REST API directly without SDKs:

#### Basic Request

{% tabs %}
{% tab title="Python (requests)" %}
```python
import requests
import json

def send_message(chatflow_id, question, streaming=False):
    url = f"http://localhost:3000/api/v1/prediction/{chatflow_id}"
    
    payload = {
        "question": question,
        "streaming": streaming
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Raise exception for bad status codes
        
        return response.json()
        
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

# Usage
result = send_message(
    chatflow_id="your-chatflow-id",
    question="What is artificial intelligence?",
    streaming=False
)

if result:
    print("Response:", result)
```
{% endtab %}

{% tab title="JavaScript (fetch)" %}
```javascript
async function sendMessage(chatflowId, question, streaming = false) {
    const url = `http://localhost:3000/api/v1/prediction/${chatflowId}`;
    
    const payload = {
        question: question,
        streaming: streaming
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error('Request failed:', error);
        return null;
    }
}

// Usage
sendMessage(
    'your-chatflow-id',
    'What is artificial intelligence?',
    false
).then(result => {
    if (result) {
        console.log('Response:', result);
    }
});
```
{% endtab %}

{% tab title="cURL" %}
```bash
curl -X POST "http://localhost:3000/api/v1/prediction/your-chatflow-id" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is artificial intelligence?",
    "streaming": false
  }'
```
{% endtab %}
{% endtabs %}

## Advanced Features

### Form Input

In Agentflow V2, you can select `form` as input type.

<figure><img src="../.gitbook/assets/image (333).png" alt="" width="418"><figcaption></figcaption></figure>

You can override the value by Variable Name of the Form Input

```json
{
    "form": {
        "title": "Example",
        "count": 1,
        ...
    }
}
```

{% tabs %}
{% tab title="Python" %}
```python
import requests

def prediction(flow_id, form):
    url = f"http://localhost:3000/api/v1/prediction/{flow_id}"
    
    payload = {
        "form": form
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

result = prediction(
    flow_id="your-flow-id",
    form={
        "title": "ABC",
        "choices": "A"
    }
)

print(result)
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
async function prediction(flowId, form) {
    const url = `http://localhost:3000/api/v1/prediction/${flowId}`;
    
    const payload = {
        form: form
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

prediction(
    'your-flow-id',
    {
        "title": "ABC",
        "choices": "A"
    }
).then(result => {
    console.log(result);
});
```
{% endtab %}
{% endtabs %}

### Configuration Override

Override chatflow settings dynamically.

Override config is **disabled** by default for security reasons. Enable it from the top right: **Settings** → **Configuration** → **Security** tab:

<div align="right" data-full-width="false"><figure><img src="../.gitbook/assets/image (21).png" alt=""><figcaption></figcaption></figure></div>

{% tabs %}
{% tab title="Python" %}
```python
import requests

def query_with_config(flow_id, question, config):
    url = f"http://localhost:3000/api/v1/prediction/{flow_id}"
    
    payload = {
        "question": question,
        "overrideConfig": config
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example: Override session and return source documents
result = query_with_config(
    flow_id="your-flow-id",
    question="How does machine learning work?",
    config={
        "sessionId": "user-123",
        "temperature": 0.5,
        "maxTokens": 1000
    }
)

print(result)
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
async function queryWithConfig(flowId, question, config) {
    const url = `http://localhost:3000/api/v1/prediction/${flowId}`;
    
    const payload = {
        question: question,
        overrideConfig: config
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Example: Override session and return source documents
queryWithConfig(
    'your-flow-id',
    'How does machine learning work?',
    {
        sessionId: 'user-123',
        temperature: 0.5,
        maxTokens: 1000
    }
).then(result => {
    console.log(result);
});
```
{% endtab %}
{% endtabs %}

For `array` type, hovering over the info icon will shows the schema that can be overriden.

Array value from overrideConfig will concatenate with existing array values. For example, if existing `startState` has:

```json
{
  "key": "key1",
  "value": "value1"
}
```

And if we enable override:

<figure><img src="../.gitbook/assets/image (337).png" alt=""><figcaption></figcaption></figure>

```json
"overrideConfig": {
    "startState": [
        {
            "key": "foo",
            "value": "bar"
        }
    ],
    "llmMessages": [
        {
            "role": "system",
            "content": "You are helpful assistant"
        }
    ]
}
```

The final `startState` will be:

```json
[
  {
    "key": "key1",
    "value": "value1"
  },
  {
    "key": "foo",
    "value": "bar"
  },
]
```

### Overriding Specific Node

By default, if multiple nodes share the same type and no node ID is specified, overriding a property will update that property across all matching nodes.

For example, there are 2 LLM nodes where I want to override the system message:

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

After enabling the ability to override:

<figure><img src="../.gitbook/assets/image (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

I can override the system message for both LLMs like so:

```json
"overrideConfig": {
    "llmMessages": [
        {
            "role": "system",
            "content": "You are sarcastic"
        }
    ]
}
```

From the Execution, you can see the overriden system message:

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

In some cases, you might want to just override config for specific node. You can do so by specifying the node id **inside** the property you want to override.

For example:

```json
"overrideConfig": {
    "llmMessages": {
        "llmAgentflow_0": [
            {
                "role": "system",
                "content": "You are sweet"
            } 
        ],
        "llmAgentflow_1": [
            {
                "role": "system",
                "content": "You are smart"
            } 
        ]
    }
}
```

If you head back to Execution, you can see each LLM has the correct overriden value:

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

### Conversation History

Provide conversation context by including previous messages in the history array.

**History Message Format**

```json
{
    "role": "apiMessage" | "userMessage",
    "content": "Message content"
}
```

{% tabs %}
{% tab title="Python" %}
```python
import requests

def chat_with_history(flow_id, question, history):
    url = f"http://localhost:3000/api/v1/prediction/{flow_id}"
    
    payload = {
        "question": question,
        "history": history
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example conversation with context
conversation_history = [
    {
        "role": "apiMessage",
        "content": "Hello! I'm an AI assistant. How can I help you today?"
    },
    {
        "role": "userMessage", 
        "content": "Hi, my name is Sarah and I'm learning about AI"
    },
    {
        "role": "apiMessage",
        "content": "Nice to meet you, Sarah! I'd be happy to help you learn about AI. What specific aspects interest you?"
    }
]

result = chat_with_history(
    flow_id="your-flow-id",
    question="Can you explain neural networks in simple terms?",
    history=conversation_history
)

print(result)
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
async function chatWithHistory(flowId, question, history) {
    const url = `http://localhost:3000/api/v1/prediction/${flowId}`;
    
    const payload = {
        question: question,
        history: history
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Example conversation with context
const conversationHistory = [
    {
        role: "apiMessage",
        content: "Hello! I'm an AI assistant. How can I help you today?"
    },
    {
        role: "userMessage", 
        content: "Hi, my name is Sarah and I'm learning about AI"
    },
    {
        role: "apiMessage",
        content: "Nice to meet you, Sarah! I'd be happy to help you learn about AI. What specific aspects interest you?"
    }
];

chatWithHistory(
    'your-flow-id',
    'Can you explain neural networks in simple terms?',
    conversationHistory
).then(result => {
    console.log(result);
});
```
{% endtab %}
{% endtabs %}

### Session Management

Use `sessionId` to maintain conversation state across multiple API calls. Each session maintains its own conversation context and memory.

{% tabs %}
{% tab title="Python" %}
```python
import requests

class FlowiseSession:
    def __init__(self, flow_id, session_id, base_url="http://localhost:3000"):
        self.flow_id= flow_id
        self.session_id = session_id
        self.base_url = base_url
        self.url = f"{base_url}/api/v1/prediction/{flow_id}"
    
    def send_message(self, question, **kwargs):
        payload = {
            "question": question,
            "overrideConfig": {
                "sessionId": self.session_id,
                **kwargs.get("overrideConfig", {})
            }
        }
        
        # Add any additional parameters
        for key, value in kwargs.items():
            if key != "overrideConfig":
                payload[key] = value
        
        try:
            response = requests.post(self.url, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            return None

# Usage
session = FlowiseSession(
    flow_id="your-flow-id",
    session_id="user-session-123"
)

# First message
response1 = session.send_message("Hello, my name is John")
print("Response 1:", response1)

# Second message - will remember the previous context
response2 = session.send_message("What's my name?")
print("Response 2:", response2)
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
class FlowiseSession {
    constructor(flowId, sessionId, baseUrl = 'http://localhost:3000') {
        this.flowId= flowId;
        this.sessionId = sessionId;
        this.baseUrl = baseUrl;
        this.url = `${baseUrl}/api/v1/prediction/${flowId}`;
    }
    
    async sendMessage(question) {
        const payload = {
            question: question,
            overrideConfig: {
                sessionId: this.sessionId
            }
        };
  
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
}

// Usage
const session = new FlowiseSession(
    'your-flow-id',
    'user-session-123'
);

async function conversationExample() {
    // First message
    const response1 = await session.sendMessage("Hello, my name is John");
    console.log("Response 1:", response1);
    
    // Second message - will remember the previous context
    const response2 = await session.sendMessage("What's my name?");
    console.log("Response 2:", response2);
}

conversationExample();
```
{% endtab %}
{% endtabs %}

### Variables

Pass dynamic variables to your flow using the `vars` property in `overrideConfig`. Variables can be used in your flow to inject dynamic content.

{% hint style="warning" %}
Variables must be created first before you can override it. Refer to [Variables](variables.md)
{% endhint %}

{% tabs %}
{% tab title="Python" %}
```python
import requests

def send_with_variables(flow_id, question, variables):
    url = f"http://localhost:3000/api/v1/prediction/{flow_id}"
    
    payload = {
        "question": question,
        "overrideConfig": {
            "vars": variables
        }
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example: Pass user information and preferences
result = send_with_variables(
    flow_id="your-flow-id",
    question="Create a personalized workout plan",
    variables={
        "user_name": "Alice",
        "fitness_level": "intermediate",
        "preferred_duration": "30 minutes",
        "equipment": "dumbbells, resistance bands",
        "goals": "strength training, flexibility"
    }
)

print(result)
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
async function sendWithVariables(flowId, question, variables) {
    const url = `http://localhost:3000/api/v1/prediction/${flowId}`;
    
    const payload = {
        question: question,
        overrideConfig: {
            vars: variables
        }
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Example: Pass user information and preferences
sendWithVariables(
    'your-flow-id',
    'Create a personalized workout plan',
    {
        user_name: 'Alice',
        fitness_level: 'intermediate',
        preferred_duration: '30 minutes',
        equipment: 'dumbbells, resistance bands',
        goals: 'strength training, flexibility'
    }
).then(result => {
    console.log(result);
});
```
{% endtab %}
{% endtabs %}

### Image Uploads

Upload images for visual analysis when your flow supports image processing. Refer to [Image](uploads.md#image) for more reference.

**Upload Structure:**

```json
{
    "data": "", 
    "type": "",
    "name": ",
    "mime": "
}
```

**Data:** Base64 or URL of an image

**Type**: `url` or `file`

**Name:** name of the image

**Mime**: `image/png`, `image/jpeg`, `image/jpg`

{% tabs %}
{% tab title="Python (Base64)" %}
```python
import requests
import base64
import os

def upload_image(flow_id, question, image_path):
    # Read and encode image
    with open(image_path, 'rb') as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    
    # Determine MIME type based on file extension
    mime_types = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    }

    file_ext = os.path.splitext(image_path)[1].lower()
    mime_type = mime_types.get(file_ext, 'image/png')
    
    url = f"http://localhost:3000/api/v1/prediction/{flow_id}"
    
    payload = {
        "question": question,
        "uploads": [
            {
                "data": f"data:{mime_type};base64,{encoded_image}",
                "type": "file",
                "name": os.path.basename(image_path),
                "mime": mime_type
            }
        ]
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example usage
result = upload_image(
    flow_id="your-flow-id",
    question="Can you describe what you see in this image?",
    image_path="path/to/your/image.png"
)

print(result)
```
{% endtab %}

{% tab title="Python (URL)" %}
```python
import requests
import os

def upload_image_url(flow_id, question, image_url, image_name=None):
    """
    Upload an image using a URL instead of base64 encoding.
    This is more efficient for images that are already hosted online.
    """
    url = f"http://localhost:3000/api/v1/prediction/{flow_id}"
    
    # Extract filename from URL if not provided
    if not image_name:
        image_name = image_url.split('/')[-1]
        if '?' in image_name:
            image_name = image_name.split('?')[0]
    
    # Determine MIME type from URL extension
    mime_types = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    }
    
    file_ext = os.path.splitext(image_name)[1].lower()
    mime_type = mime_types.get(file_ext, 'image/jpeg')
    
    payload = {
        "question": question,
        "uploads": [
            {
                "data": image_url,
                "type": "url",
                "name": image_name,
                "mime": mime_type
            }
        ]
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example usage with public image URL
result = upload_image_url(
    flow_id="your-flow-id",
    question="What's in this image? Analyze it in detail.",
    image_url="https://example.com/path/to/image.jpg",
    image_name="example_image.jpg"
)

print(result)

# Example with direct URL (no custom name)
result2 = upload_image_url(
    chatflow_id="your-chatflow-id",
    question="Describe this screenshot",
    image_url="https://i.imgur.com/sample.png"
)

print(result2)
```
{% endtab %}

{% tab title="JavaScript (File Upload)" %}
```javascript
async function uploadImage(flowId, question, imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async function(e) {
            const base64Data = e.target.result;
            
            const payload = {
                question: question,
                uploads: [
                    {
                        data: base64Data,
                        type: 'file',
                        name: imageFile.name,
                        mime: imageFile.type
                    }
                ]
            };
            
            try {
                const response = await fetch(`http://localhost:3000/api/v1/prediction/${flowId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                resolve(result);
                
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(imageFile);
    });
}

// Example usage in browser
document.getElementById('imageInput').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (file) {
        try {
            const result = await uploadImage(
                'your-flow-id',
                'Can you describe what you see in this image?',
                file
            );
            console.log('Analysis result:', result);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
});
```
{% endtab %}

{% tab title="JavaScript (URL)" %}
```javascript
async function uploadImageUrl(flowId, question, imageUrl, imageName = null) {
    /**
     * Upload an image using a URL instead of base64 encoding.
     * This is more efficient for images that are already hosted online.
     */
    
    // Extract filename from URL if not provided
    if (!imageName) {
        imageName = imageUrl.split('/').pop();
        if (imageName.includes('?')) {
            imageName = imageName.split('?')[0];
        }
    }
    
    // Determine MIME type from URL extension
    const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    };
    
    const fileExt = imageName.toLowerCase().substring(imageName.lastIndexOf('.'));
    const mimeType = mimeTypes[fileExt] || 'image/jpeg';
    
    const payload = {
        question: question,
        uploads: [
            {
                data: imageUrl,
                type: 'url',
                name: imageName,
                mime: mimeType
            }
        ]
    };
    
    try {
        const response = await fetch(`http://localhost:3000/api/v1/prediction/${flowId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Example usage with public image URL
async function analyzeImageFromUrl() {
    try {
        const result = await uploadImageUrl(
            'your-flow-id',
            'What is in this image? Analyze it in detail.',
            'https://example.com/path/to/image.jpg',
            'example_image.jpg'
        );
        
        console.log('Analysis result:', result);
    } catch (error) {
        console.error('Upload failed:', error);
    }
}

// Example with direct URL (no custom name)
uploadImageUrl(
    'your-flow-id',
    'Describe this screenshot',
    'https://i.imgur.com/sample.png'
).then(result => {
    if (result) {
        console.log('Analysis result:', result);
    }
});

// Example with multiple image URLs
async function analyzeMultipleImages() {
    const imageUrls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.png',
        'https://example.com/image3.gif'
    ];
    
    const results = await Promise.all(
        imageUrls.map(url => 
            uploadImageUrl(
                'your-flow-id',
                `Analyze this image: ${url}`,
                url
            )
        )
    );
    
    results.forEach((result, index) => {
        console.log(`Image ${index + 1} analysis:`, result);
    });
}
```
{% endtab %}

{% tab title="JavaScript (Node.js)" %}
```javascript
const fs = require('fs');
const path = require('path');

async function uploadImage(flowId, question, imagePath) {
    // Read image file
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    // Determine MIME type
    const ext = path.extname(imagePath).toLowerCase();
    const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    };
    const mimeType = mimeTypes[ext] || 'image/png';
    
    const payload = {
        question: question,
        uploads: [
            {
                data: `data:${mimeType};base64,${base64Image}`,
                type: 'file',
                name: path.basename(imagePath),
                mime: mimeType
            }
        ]
    };
    
    try {
        const response = await fetch(`http://localhost:3000/api/v1/prediction/${flowId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Example usage
uploadImage(
    'your-flow-id',
    'Can you describe what you see in this image?',
    'path/to/your/image.png'
).then(result => {
    console.log('Analysis result:', result);
});
```
{% endtab %}
{% endtabs %}

### Audio Uploads (Speech to Text)

Upload audio files for speech-to-text processing. Refer to [Audio](uploads.md#audio) for more reference.

**Upload Structure:**

```json
{
    "data": "", 
    "type": "",
    "name": ",
    "mime": "
}
```

**Data:** Base64 or URL of an audio

**Type**: `url` or `file`

**Name:** name of the audio

**Mime**: `audio/mp4`, `audio/webm`, `audio/wav`, `audio/mpeg`

{% tabs %}
{% tab title="Python (Base64)" %}
```python
import requests
import base64
import os

def upload_audio(flow_id, audio_path, question=None):
    # Read and encode audio
    with open(audio_path, 'rb') as audio_file:
        encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')
    
    # Determine MIME type based on file extension
    mime_types = {
        '.webm': 'audio/webm',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.m4a': 'audio/mp4'
    }
 
    file_ext = os.path.splitext(audio_path)[1].lower()
    mime_type = mime_types.get(file_ext, 'audio/webm')
    
    url = f"http://localhost:3000/api/v1/prediction/{flow_id}"
    
    payload = {
        "uploads": [
            {
                "data": f"data:{mime_type};base64,{encoded_audio}",
                "type": "audio",
                "name": os.path.basename(audio_path),
                "mime": mime_type
            }
        ]
    }
    
    # Add question if provided
    if question:
        payload["question"] = question
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example usage
result = upload_audio(
    flow_id="your-flow-id",
    audio_path="path/to/your/audio.wav",
    question="Please transcribe this audio and summarize the content"
)

print(result)
```
{% endtab %}

{% tab title="Python (URL)" %}
```python
import requests
import os

def upload_audio_url(flow_id, audio_url, question=None, audio_name=None):
    """
    Upload an audio file using a URL instead of base64 encoding.
    This is more efficient for audio files that are already hosted online.
    """
    url = f"http://localhost:3000/api/v1/prediction/{flow_id}"
    
    # Extract filename from URL if not provided
    if not audio_name:
        audio_name = audio_url.split('/')[-1]
        if '?' in audio_name:
            audio_name = audio_name.split('?')[0]
    
    # Determine MIME type from URL extension
    mime_types = {
        '.webm': 'audio/webm',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.m4a': 'audio/mp4',
        '.ogg': 'audio/ogg',
        '.aac': 'audio/aac'
    }

    file_ext = os.path.splitext(audio_name)[1].lower()
    mime_type = mime_types.get(file_ext, 'audio/wav')
    
    payload = {
        "uploads": [
            {
                "data": audio_url,
                "type": "url",
                "name": audio_name,
                "mime": mime_type
            }
        ]
    }
    
    # Add question if provided
    if question:
        payload["question"] = question
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example usage with public audio URL
result = upload_audio_url(
    flow_id="your-flow-id",
    audio_url="https://example.com/path/to/speech.mp3",
    question="Please transcribe this audio and provide a summary",
    audio_name="speech_recording.mp3"
)

print(result)

# Example with direct URL (no custom name or question)
result2 = upload_audio_url(
    flow_id="your-flow-id",
    audio_url="https://storage.googleapis.com/sample-audio/speech.wav"
)

print(result2)

# Example for meeting transcription
result3 = upload_audio_url(
    flow_id="your-flow-id",
    audio_url="https://meetings.example.com/recording-123.m4a",
    question="Transcribe this meeting recording and extract key action items and decisions made",
    audio_name="team_meeting_jan15.m4a"
)

print(result3)
```
{% endtab %}

{% tab title="JavaScript (File Upload)" %}
```javascript
async function uploadAudio(flowId, audioFile, question = null) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async function(e) {
            const base64Data = e.target.result;
            
            const payload = {
                uploads: [
                    {
                        data: base64Data,
                        type: 'audio',
                        name: audioFile.name,
                        mime: audioFile.type
                    }
                ]
            };
            
            // Add question if provided
            if (question) {
                payload.question = question;
            }
            
            try {
                const response = await fetch(`http://localhost:3000/api/v1/prediction/${flowId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                resolve(result);
                
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(audioFile);
    });
}

// Example usage with file input
document.getElementById('audioInput').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (file) {
        try {
            const result = await uploadAudio(
                'your-flow-id',
                file,
                'Please transcribe this audio and summarize the content'
            );
            console.log('Transcription result:', result);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
});
```
{% endtab %}

{% tab title="JavaScript (URL)" %}
```javascript
async function uploadAudioUrl(flowId, audioUrl, question = null, audioName = null) {
    /**
     * Upload an audio file using a URL instead of base64 encoding.
     * This is more efficient for audio files that are already hosted online.
     */
    
    // Extract filename from URL if not provided
    if (!audioName) {
        audioName = audioUrl.split('/').pop();
        if (audioName.includes('?')) {
            audioName = audioName.split('?')[0];
        }
    }
    
    // Determine MIME type from URL extension
    const mimeTypes = {
        '.webm': 'audio/webm',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.m4a': 'audio/mp4',
        '.ogg': 'audio/ogg',
        '.aac': 'audio/aac'
    };
    
    const fileExt = audioName.toLowerCase().substring(audioName.lastIndexOf('.'));
    const mimeType = mimeTypes[fileExt] || 'audio/wav';
    
    const payload = {
        uploads: [
            {
                data: audioUrl,
                type: 'url',
                name: audioName,
                mime: mimeType
            }
        ]
    };
    
    // Add question if provided
    if (question) {
        payload.question = question;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/v1/prediction/${flowId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Example usage with public audio URL
async function transcribeAudioFromUrl() {
    try {
        const result = await uploadAudioUrl(
            'your-flow-id',
            'https://example.com/path/to/speech.mp3',
            'Please transcribe this audio and provide a summary',
            'speech_recording.mp3'
        );
        
        console.log('Transcription result:', result);
    } catch (error) {
        console.error('Upload failed:', error);
    }
}

// Example with direct URL (no custom name or question)
uploadAudioUrl(
    'your-flow-id',
    'https://storage.googleapis.com/sample-audio/speech.wav'
).then(result => {
    if (result) {
        console.log('Transcription result:', result);
    }
});

// Example for meeting transcription
uploadAudioUrl(
    'your-flow-id',
    'https://meetings.example.com/recording-123.m4a',
    'Transcribe this meeting recording and extract key action items and decisions made',
    'team_meeting_jan15.m4a'
).then(result => {
    if (result) {
        console.log('Meeting analysis:', result);
    }
});

// Example with multiple audio URLs for batch processing
async function transcribeMultipleAudios() {
    const audioUrls = [
        {
            url: 'https://example.com/interview1.wav',
            question: 'Transcribe this interview and summarize key points',
            name: 'interview_candidate_1.wav'
        },
        {
            url: 'https://example.com/interview2.mp3',
            question: 'Transcribe this interview and summarize key points',
            name: 'interview_candidate_2.mp3'
        },
        {
            url: 'https://example.com/lecture.m4a',
            question: 'Transcribe this lecture and create bullet-point notes',
            name: 'cs101_lecture.m4a'
        }
    ];
    
    const results = await Promise.all(
        audioUrls.map(audio => 
            uploadAudioUrl(
                'your-flow-id',
                audio.url,
                audio.question,
                audio.name
            )
        )
    );
    
    results.forEach((result, index) => {
        console.log(`Audio ${index + 1} transcription:`, result);
    });
}
```
{% endtab %}
{% endtabs %}

### File Uploads

Upload files to have LLM process the files and answer query related to the files. Refer to [Files](uploads.md#files) for more reference.

### Human Input

To resume the execution from a previously stopped checkpoint, `humanInput` needs to be provided. Refer [Human In The Loop](../tutorials/human-in-the-loop.md) for details.

**Human Input Structure**

```json
{
    "type": "",
    "feedback": ""
}
```

* **type**: Either `proceed` or `reject`
* **feedback**: Feedback to the last output

{% hint style="warning" %}
Must specify the same `sessionId` where the execution was stopped
{% endhint %}

```json
{
    "humanInput": {
        "type": "reject",
        "feedback": "Include more emoji"
    },
    "overrideConfig": {
        "sessionId": "abc"
    }
}
```

## Troubleshooting

1. **404 Not Found**: Verify the flow ID is correct and the flow exists
2. **401 Unauthorized Access**: Verify if the flow is API key protected
3. **400 Bad Request**: Check request format and required fields
4. **413 Payload Too Large**: Reduce file sizes or split large requests
5. **500 Internal Server Error:** Check if there is any misconfiguration from the nodes in the flow



===== api-reference/chatflows.md =====

# Chatflows

{% openapi-operation spec="flowiseai-api" path="/chatflows" method="get" %}
[OpenAPI flowiseai-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/238edaa326f0ca4057047699b251f09b359ab0c2a5d5201f7095b100792cf411.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250717%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250717T144327Z&X-Amz-Expires=172800&X-Amz-Signature=b4e9a97d35bf5ed41bad9cb6ac39ae59371100f618dc64f1d01f6adf1f6419a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="flowiseai-api" path="/chatflows/{id}" method="get" %}
[OpenAPI flowiseai-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/238edaa326f0ca4057047699b251f09b359ab0c2a5d5201f7095b100792cf411.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250717%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250717T144327Z&X-Amz-Expires=172800&X-Amz-Signature=b4e9a97d35bf5ed41bad9cb6ac39ae59371100f618dc64f1d01f6adf1f6419a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="flowiseai-api" path="/chatflows/apikey/{apikey}" method="get" %}
[OpenAPI flowiseai-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/238edaa326f0ca4057047699b251f09b359ab0c2a5d5201f7095b100792cf411.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250717%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250717T144327Z&X-Amz-Expires=172800&X-Amz-Signature=b4e9a97d35bf5ed41bad9cb6ac39ae59371100f618dc64f1d01f6adf1f6419a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="flowiseai-api" path="/chatflows/{id}" method="put" %}
[OpenAPI flowiseai-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/238edaa326f0ca4057047699b251f09b359ab0c2a5d5201f7095b100792cf411.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250717%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250717T144327Z&X-Amz-Expires=172800&X-Amz-Signature=b4e9a97d35bf5ed41bad9cb6ac39ae59371100f618dc64f1d01f6adf1f6419a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="flowiseai-api" path="/chatflows/{id}" method="delete" %}
[OpenAPI flowiseai-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/238edaa326f0ca4057047699b251f09b359ab0c2a5d5201f7095b100792cf411.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250717%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250717T144327Z&X-Amz-Expires=172800&X-Amz-Signature=b4e9a97d35bf5ed41bad9cb6ac39ae59371100f618dc64f1d01f6adf1f6419a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% openapi-operation spec="flowiseai-api" path="/chatflows" method="post" %}
[OpenAPI flowiseai-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/238edaa326f0ca4057047699b251f09b359ab0c2a5d5201f7095b100792cf411.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250717%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250717T144327Z&X-Amz-Expires=172800&X-Amz-Signature=b4e9a97d35bf5ed41bad9cb6ac39ae59371100f618dc64f1d01f6adf1f6419a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}



===== migration-guide/v2.1.4-migration-guide.md =====

# v2.1.4 Migration Guide

OverrideConfig enables users to override flow configurations from the API or when using Embed. Due to security concerns, it is now disabled by default.

Users must explicitly specify which config can be overriden from the UI.

1.) Go to Configuration:

<figure><img src="../.gitbook/assets/image (189).png" alt="" width="221"><figcaption></figcaption></figure>

2.) Enable Override Configuration:

<figure><img src="../.gitbook/assets/image (190).png" alt=""><figcaption></figcaption></figure>

3.) Turn on the toggle for the config that can be overriden and save it.

<figure><img src="../.gitbook/assets/image (191).png" alt=""><figcaption></figcaption></figure>

4.) For example, users can then override these variables and config. Refer to [OverrideConfig](/broken/pages/F2AfRpI7qYixNiBWpmIe#override-config).

```json
{
    "overrideConfig": {
        "systemMessage": "You are helpful assistant",
        "vars": {
            "character": "nice"
        }
    }
}
```

