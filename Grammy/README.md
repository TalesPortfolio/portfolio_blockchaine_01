

## Para fazer o deploy tem que esta no mesmo nivem que .env e foundry.toml

tales@tales-lima:~/Documents/GITHUB-PORTFOLIO/portfolio_blockchaine_01/Grammy/contracts$ 
`forge script script/DeployGrammy.s.sol:DeployGrammy --broadcast --rpc-url $RPC_URL --private-key $PRIVATE_KEY`

## Gerando um ABI

compila
`forge build`

navege ate 
`out/Grammy.sol/Grammy.json`

execute
`cat out/Grammy.sol/Grammy.json | jq '.abi' > ABI.json`
