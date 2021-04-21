import graphene
import graphql_jwt
from blog import schema


class Mutation(schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


class Query(schema.Query, graphene.ObjectType):
    hello = graphene.String(default_value="Hi,I am MD Rafiqul islam")


schema = graphene.Schema(query=Query, mutation=Mutation)
