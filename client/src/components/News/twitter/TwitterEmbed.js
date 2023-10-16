import useScript from '../../hooks/useScript';

function TwitterEmbed() {
    useScript('https://platform.twitter.com/widgets.js');
    return (
        // eslint-disable-next-line
        <a 
            class="twitter-timeline"
            data-theme="dark"
            href="https://twitter.com/Warcraft?ref_src=twsrc%5Etfw"
            data-width="500"
            data-chrome="noheader nofooter noborders transparent"
            charSet='utf-8'
            alt="twitter embed"
        />
    )
}

export default TwitterEmbed;