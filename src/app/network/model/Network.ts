import {NetworkType} from './network-type';

export class Network {
  public id: number;
  public type: NetworkType;
  public name: string;
  public commitId: string;
  public imageId: string;
  public containerId: string;
  public status: number;
  public apiKey: string;
  public connectionUri: string;
  public dockerRegistry: string;
}
