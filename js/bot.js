const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}!`);
    console.log(`logged in as ${client.user.id}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        msg.channel.send('pong!');
    }
    else if (command === 'help') {
        const embed = new Discord.MessageEmbed()
        .setColor('#0000FF')
        .setTitle('Here are a list of commands to use')
        .setAuthor('Test bot')
        .addFields(
            { name: '//help', value: 'The help command will return a list of commands that you can use' },
            { name: '//ping', value: 'The ping command will return with the best possible answer' },
            { name: '//split', value: 'Currently implmenting this feature' },
        )
        .setTimestamp()
        .setFooter('This is the footer');
        msg.channel.send(embed);
    }
    else if(msg.content.startsWith(`${prefix}me`)) {
        msg.channel.send(`Username: ${msg.author.username}\nID: ${msg.author.id}`);
    }
    else if (command === 'split') {
        const start_channel = client.channels.cache.get('754533057704493056');
        const end_channel = client.channels.cache.get('754533082752614400');
        const my_user_id = '304745620411777024';
        // client.users.id;
        console.log(msg.channel.client.users.cache);
        console.log(client.channels.cache);
    }
    else if (command === 'tuff') {
        msg.channel.send(`But you aint tuff ${msg.author.username}, you just a little bitch`);
    }
    else if (command === 'findmeanewfriend') {
        msg.channel.send('LUL');
    }
});

client.login(token);