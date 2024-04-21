import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver";
import transactionResolver from "./transaction.resolver";

const mergedTypeDefs = mergeResolvers([userResolver, transactionResolver]);

export default mergedTypeDefs;