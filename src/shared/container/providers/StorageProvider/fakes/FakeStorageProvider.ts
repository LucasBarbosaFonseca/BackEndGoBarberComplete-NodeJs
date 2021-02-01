import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(fileName: string): Promise<string> {
    this.storage.push(fileName);

    return fileName;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(storageFile => storageFile == file);

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;