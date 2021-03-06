import { TreeItem } from '../../tree';
import { ICommandParameter } from './ICommandParameter';

export abstract class CommandBase {
    protected parameters: ICommandParameter[];
    protected args: string[];

    public async run(item: TreeItem): Promise<void> {
        if (!this.shouldRun(item)) return;

        let args = await this.getArguments();
        if (!args) return;
        
        await this.runCommand(item, args);
    }

    protected async getArguments() : Promise<string[]> {
        if (!this.parameters) return [];

        this.args = [];
        for (let i = 0; i < this.parameters.length; i++) {
            let parameter = this.parameters[i];
            let success = await parameter.setArguments();
            if (!success) return;

            this.args = this.args.concat(parameter.getArguments());
        }

        return this.args;
    }

    protected shouldRun(item: TreeItem): boolean {
        return true;
    }

    protected abstract runCommand(item: TreeItem, args: string[]): Promise<void>;
}