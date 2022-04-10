# Action remove untagged images in ECR 

This action is for those who use the AWS Schema Registry,  
with it it is possible to delete all untagged images after  
executing a `push` of a docker image.

## Exemplo

```yml
-
    name: delete images without tag
    id: images-ecr
    uses: dcorrea777/action-rm-unlabeled-images-ecr@v1
    with:
        repository: 'my-image'
        access_key: ${{ secrets.ACCESS_KEY }}
        secret_key: ${{ secrets.SECRET_KEY }}
```
