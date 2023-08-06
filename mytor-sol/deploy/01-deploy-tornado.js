const { network } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    arguments = []
    log("------------------------------[Deployment Started]------------------------------")
    // const hasher = await deploy("Hasher", {
    //     from: deployer,
    //     args: arguments,
    //     log: true,
    //     waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS || 1,
    // })

    // log(`Hasher deployed to ${hasher.address} on ${hasher.name}`)
    // deploy hasher
    const Hasher = await hre.ethers.getContractFactory("Hasher")
    const hasher = await Hasher.deploy()
    await hasher.deployed()
    const hasherAddress = hasher.address
    console.log(`Hasher deployed to ${hasher.address}`)

    // deploy tornado
    const Tornado = await hre.ethers.getContractFactory("Tornado")
    // const tornado = await Tornado.deploy(hasherAddress, verifierAddress)
    const tornado = await Tornado.deploy(hasherAddress)
    await tornado.deployed()
    console.log(`Tornado deployed to ${tornado.address}`)

    // const tornado = await deploy("Tornado", {
    //     from: deployer,
    //     args: arguments,
    //     log: true,
    //     waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS || 1,
    // })

    // log(`Tornado deployed to ${tornado.address} on ${network.name}`)

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(gptNFT.address, arguments)
    }
}

// module.exports.tags = ["all", "gptnft", "main"]
