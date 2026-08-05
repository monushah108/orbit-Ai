import { faker } from "@faker-js/faker";

export default function getUser() {
  const name = faker.person.firstName();
  const avatar = `https://api.dicebear.com/9.x/personas/svg?seed=${name}`;

  return {
    id: crypto.randomUUID(),
    name,
    avatar,
    mute: false,
    deafen: false,
  };
}
