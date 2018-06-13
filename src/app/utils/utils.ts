
export class Utils {

  static origMesPattern = /-[-]*[\s]*Original Message[\s]*[-]*-/;
  static fwPattern = /-[-]+ Forwarded by[\s\S][^-]+[-]+-/;

  static getMessagePosition(content: string): number {
    const origMesRegexp = new RegExp(Utils.origMesPattern, 'ig');
    const fwRegexp = new RegExp(Utils.fwPattern, 'ig');
    const pos = content.search(origMesRegexp);
    const posFW = content.search(fwRegexp);
    return (pos >= 0 && posFW < 0) ? pos : ((pos < 0 && posFW >= 0) ? posFW : Math.min(pos, posFW));
  }

  static splitOnLinkMessages(content: string): Array<string> {
    const linkMessages: Array<string> = [];
    const origMessages = content.split(Utils.origMesPattern);
    origMessages.forEach(origMessage => {
      const fwOrigMessages = origMessage.split(Utils.fwPattern);
      fwOrigMessages.forEach(message => {
        linkMessages.push(message);
      });
    });

    return linkMessages;
  }
}
