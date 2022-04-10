const core = require('@actions/core');
const AWS = require('aws-sdk');

(async () => {
    try {
        const ecr = new AWS.ECR({
            apiVersion: '2015-09-21',
            region: core.getInput('region'),
            accessKeyId: core.getInput('access_key'),
            secretAccessKey: core.getInput('secret_key')
        });
        const repository = core.getInput('repository');
        const images = await ecr.listImages({
            repositoryName: repository,
            maxResults: 100,
            filter: { tagStatus: 'UNTAGGED' },
        }).promise();

        if (images.imageIds.length) {
            const imagesDeleted = await ecr.batchDeleteImage({
                imageIds: images.imageIds,
                repositoryName: repository
            }).promise();

            imagesDeleted.imageIds.forEach(i => console.log(`deleted images ${i.imageDigest}`))
        } else {
            console.log('No images found to delete.');
        }

    } catch (error) {
        core.setFailed(error.message);
    }
})()
