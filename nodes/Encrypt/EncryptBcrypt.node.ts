import bcrypt from 'bcryptjs';
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class EncryptBcrypt implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Encrypt (bcrypt)',
		name: 'encryptBcrypt',
		icon: { light: 'file:Encrypt.svg', dark: 'file:Encrypt.svg' },
		group: ['transform'],
		version: 1,
		description: 'Encrypt text using bcrypt',
		defaults: {
			name: 'Encrypt',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Text to Encrypt',
				name: 'text',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Salt Rounds',
				name: 'salt',
				type: 'number',
				default: 10,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const text = this.getNodeParameter('text', i) as string;
			const saltRounds = this.getNodeParameter('salt', i) as number;
			const hash = bcrypt.hashSync(text, saltRounds);

			returnData.push({ json: { hash } });
		}

		return [returnData];
	}
}
