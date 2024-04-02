import ThirdPartyNode from "supertokens-node/recipe/thirdparty";
import SessionNode from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";
import SuperTokens from "supertokens-node";

export let backendConfig = (): TypeInput => {
    return {
        supertokens: {
            // this is the location of the SuperTokens core.
            connectionURI: "https://try.supertokens.com",
        },
        appInfo,
        // recipeList contains all the modules that you want to
        // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
        recipeList: [
            ThirdPartyNode.init({
                signInAndUpFeature: {
                    providers: [
                        // We have provided you with development keys which you can use for testing.
                        // IMPORTANT: Please replace them with your own OAuth keys for production use.
                        {
                            config: {
                                thirdPartyId: "boxy-saml",
                                clients: [
                                    {
                                        clientId:
                                            "aafef1ce428873842eb53e51f45c6175aec1aa63",
                                        clientSecret: "29a0a5b7703ccf078b48ded3c674425d44a9b7be7491b376",
                                        additionalConfig: {
                                            boxyURL: "https://boxy.supertokens.sraak.com"
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            }),
            SessionNode.init(),
            Dashboard.init(),
            UserRoles.init(),
        ],
        isInServerlessEnv: true,
        framework: "custom",
    };
};

let initialized = false;
export function ensureSuperTokensInit() {
    if (!initialized) {
        SuperTokens.init(backendConfig());
        initialized = true;
    }
}
