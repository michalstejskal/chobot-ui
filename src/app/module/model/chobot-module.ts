import {ActualVersion} from './actual-version';

export class ChobotModule {
  public id: number;
  public type: number;
  public responseClass: string;
  public code: string;
  public name: string;
  public actualVersion: ActualVersion;
  public status: number;
  public repositoryUrl: string;
  public connectionUri: string;
  public apiKey: string;
  public connectionPort: number;
  public imageId: string;
}
