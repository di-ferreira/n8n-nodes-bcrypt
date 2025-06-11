import bcrypt from 'bcryptjs';
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class CompareBcrypt implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Compare Hash (bcrypt)',
		name: 'compareBcrypt',
		icon: { light: 'file:Compare.svg', dark: 'file:Compare.svg' },
		group: ['transform'],
		version: 1,
		description: 'Compare a text with a bcrypt hash',
		defaults: {
			name: 'Compare',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Plain Text',
				name: 'text',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Hash',
				name: 'hash',
				type: 'string',
				default: '',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const text = this.getNodeParameter('text', i) as string;
			const hash = this.getNodeParameter('hash', i) as string;
			const match = bcrypt.compareSync(text, hash);

			returnData.push({ json: { match } });
		}

		return [returnData];
	}
}
