const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https')
const {
    prefix,
    token
} = require('./config.json');

errorsChannel = '785640637952819261';

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}!`);
    console.log(`logged in as ${client.user.id}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

//ping command
    if (command === 'ping') {
        msg.channel.send('pong!');

//help command
    } else if (command === 'help') {
        try {
            const embed = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .setTitle('Here are a list of commands to use')
                .setAuthor('Test bot')
                .addFields({
                    name: '//help',
                    value: 'The help command will return a list of commands that you can use'
                }, {
                    name: '//ping',
                    value: 'The ping command will return with the best possible answer'
                }, {
                    name: '//dm',
                    value: 'Send a DM on behalf of Realm Bot'
                }, {
                    name: '//tuff',
                    value: 'You dont want to find out'
                }, {
                    name: '//findmeanewfriend',
                    value: 'You really dont want to find this one out'
                }, {
                    name: '//dadjoke',
                    value:'Recieve a random dad joke'
                } )
                .setTimestamp()
                .setFooter('Realm bot gives you kisses');
            msg.channel.send(embed);
        }
        catch (err){
            error_messages(err)
        }

//me command
    } else if (msg.content.startsWith(`${prefix}me`)) {
        try {
            msg.channel.send(`Username: ${msg.author.username}\nID: ${msg.author.id}`);
        } catch {
            error_messages("Error in //me command")
        }

//dm channel
    } else if (command === 'dm') {
        try {
	    client.users.cache.get(`${msg.author.id}`).send(`You thought this wouldnt work now did you ${msg.author.username}`);
        } catch {
            error_messages("Error in //dm command")
        }
        
//tuff command
    } else if (command === 'tuff') {
        msg.channel.send(`But you aint tuff ${msg.author.username}, you just a little bitch`);

//findmeanewfriend command
    } else if (command === 'findmeanewfriend') {
        msg.channel.send('LUL');
    } 

//dadjoke command
    else if (command === 'dadjoke'){
        try{
            https.get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes', (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', (error) => {
                    const obj = JSON.parse(data)
                    msg.channel.send(obj.setup);
                    sleep(3000).then(() => {
                        msg.channel.send(obj.punchline);
                    });
                    
                });
            })
            .on('error', (error) => {
                error_messages(error);
            });
        }
        catch (err) {
            error_messages(err)
        }
    }

//mute channel command
    else if (command === 'mc') {
        if (msg.member.voice.channel) {
            let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
           
            for (const [memberID, member] of channel.members) {
              // I added the following if statement to mute everyone but the invoker:
              // if (member != message.member)
          
              // This single line however, nested inside the for loop, should mute everyone in the channel:
              member.voice.setMute(true).catch(data => console.log(data));
            }
          } else {
            msg.reply('You need to join a voice channel first!');
          }
        
        // mems = msg.member.voice.channel.members;
        // mems.forEach(x => {
        //     console.log(x.id)
            
        
    }
    else if (command == 'tinypenisplease') {
        msg.channel.send("Here you go...", {
            files: [
                "images\\jknop2.PNG"
            ]
        })
    }
    else {
        msg.channel.send("Sorry kid it looks like you did something wrong");
    }
});

function error_messages(st) {
    client.channels.cache.get(errorsChannel).send(st)
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

client.login(token);
