import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    children: `${name.split('')[0][0]}${name.split('')[1][0]}`,
  };
}

export default function EventList({ names }: { names: string[] }) {
  return (
    <AvatarGroup max={4}>
      { names.map(name => (
        <Avatar {...stringAvatar(name || '')} />
      ))}
      
    </AvatarGroup>
  );
}
