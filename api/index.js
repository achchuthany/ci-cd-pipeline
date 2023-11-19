import node_vault from "node-vault";

const getVaultKeyValue = async () => {
    const vaultEndpoint = process.env.VAULT_ENDPOINT || "https://vault.myuoj.xyz";
    const vaultApiVersion = process.env.VAULT_API_VERSION || "v1";

    const vaultInstance = node_vault({
        apiVersion: vaultApiVersion,
        endpoint: vaultEndpoint
    });

    const roleId =
        process.env.VAULT_ROLE_ID || "";

    const secretId =
        process.env.VAULT_SECRET_ID || "";

    const result = await vaultInstance.approleLogin({
        role_id: roleId,
        secret_id: secretId
    });

    vaultInstance.token = result.auth.client_token;

    const { data } = await vaultInstance.read("secret/data/development/services");

    return data;
};

export default getVaultKeyValue;
