const UserInfoController = require('../controllers/userinfo.controller');
const Util = require('../util/util');
const MessageUtil = require('../util/Discord/message');

/**
   * balance
   * @date 2020-09-01
   * @param {any} msg
   * @return {any}
   */
exports.execute = async (msg) => {
  try {
    const userInfo = await UserInfoController.getUser( msg.author.id );
    if ( !userInfo ) {
      await msg.author.send('You dont have a account.');
      return;
    }
    const userInfoBalance = await UserInfoController.getBalance( msg.author.id );
    if ( userInfoBalance ) {
      msg.author.send( MessageUtil.msgEmbed('Balance', msgs.balance + userInfoBalance + ' HLS') );
      const isDm = Util.isDmChannel( msg.channel.type );
      if ( !isDm ) {
        MessageUtil.reactionDm( msg );
      }
    } else {
      msg.author.send( msgs.balance_error );
    }
  } catch (error) {
    logger.error( error );
  }
};

exports.info = {
  alias: ['balance', 'b', 'bal', '$'],
};
