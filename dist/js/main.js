$(document).ready(() => {
    var tagify = new Tagify($('.video-tags')[0]);

    $('.video-url-submit').on('submit', async (e) => {
        e.preventDefault();
        // get video link
        const videoUrl = $('.video-url').val();
        $('.output').hide();
        $('.loader').show();
        $('.error').hide();
        const {title, thumbnail, description, tags} = await getVideoInfo(videoUrl);
        $('.output').show();
        $('.loader').hide();

        // set video info
        $('.video-title').val(title);
        $('.video-thumbnail').attr('src', thumbnail);
        $('.video-description').text(description);
        // $('.video-tags').text(tags);
        tagify.addTags(tags);
    })
    // get video information from youtube
    const getVideoInfo = async (url) => {
        const parsedUrl = new URL(url);
        
        let path;
        if (parsedUrl.hostname.includes('youtube.com')) {
            path = '/youtube';
        } else if (parsedUrl.hostname.includes('vimeo.com')) {
            path = '/vimeo';
        } else if (parsedUrl.hostname.includes('dailymotion.com')) {
            path = '/dailymotion';
        } else {
            const err = new Error('Invalid video url');
            throwError(err);
        }
        try {
            const res = await axios.post(`${VIDEO_INFO_SERVER + path}`, { videoUrl: url });
            return res.data;
        } catch (err) {
            throwError(err);
        }
    }

    const throwError = (err) => {
        $('.output').hide();
        $('.loader').hide();
        $('.error').text('Unable to import video');
        $('.error').show();
    }
});