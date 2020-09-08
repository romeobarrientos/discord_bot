import discord
from discord.ext import commands

bot = discord.Client()
client = commands.Bot(command_prefix='?')
serverID = '752885344076169340'

@client.command()
async def queue(ctx):
    await ctx.send(f"""channel: {ctx.channel}""")
    await ctx.send(f"""Guild: {ctx.guild}""")
    await ctx.send(f"""Author: {ctx.author}""")

@client.event
async def on_ready():
    print("we are ready!")

# @client.event
# async def on_message(message):
#     if message.author == client.user:
#         return
#     if message.content.startswith('$hello'):
#         await message.channel.send('Hello!')
#     elif message.content == 'helpme':
#         await message.channel.send('heling now bud')


token = input("Enter Token: ")
client.run(token)
