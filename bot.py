import discord

client = discord.Client()

@client.event
async def on_ready():
    print("we are ready!")

# @client.event
# async def 

token = input("Enter Token: ")
client.run(token)