import { Manager } from '../src';

async function installFromConfigFile() {
  const manager = Manager.fromConfig('../chaincode.config.json');

  await manager.init();
  await manager.install('Tellus', '1');
  await manager.instantiate('Tellus', '1');
  await manager.initControllers('Tellus');
}

async function installFromConfigObject() {
  const manager = new Manager({
    worldsibuNpmToken: '6ffdb1f9-3392-4015-b12b-f8a743b32858',
    channel: 'mychannel',
    peers: [
      {
        url: 'grpc://localhost:7051',
        msp: '../../../basic-network/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com'
      }
    ],
    orderer: {
      url: 'grpc://localhost:7050',
      msp: '../../../basic-network/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com'
    },
    admin: {
      name: 'admin',
      mspName: 'Org1MSP',
      keyStore: '~/.hfc-key-store',
      msp: '../../../basic-network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com'
    },
    controllers: [
      {
        name: '@worldsibu/tellus-organization-ccc',
        version: '0.1.0',
        controller: 'OrganizationController'
      }
    ],
    policy: {
      identities: [
        { role: { name: 'member', mspId: 'Org1MSP' } }
      ],
      policy: {
        '1-of': [{ 'signed-by': 0 }]
      }
    }
  });

  await manager.init();
  await manager.install('Tellus', '1');
  await manager.instantiate('Tellus', '1');
  await manager.initControllers('Tellus');
}

async function upgrade() {
  const manager = Manager.fromConfig('../chaincode.config.json');

  await manager.init();
  await manager.install('Tellus', '2');
  await manager.upgrade('Tellus', '2');
  await manager.initControllers('Tellus');
}