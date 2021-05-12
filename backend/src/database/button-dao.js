import { Button } from "./schema";

async function createButton(button) {
  const dbArticle = new Button(button);
  await dbArticle.save();
  return dbArticle;
}

export async function retrieveButton() {
  const button = await Button.findOne();

  console.log('retrieve button');
  console.log(button);

  if (!button) {
    return await createButton(new Button({ pressed: false }));
  }

  return button;
}

export async function updateButton(button) {
  const dbButton = await Button.findOne();
  const result = await Button.findOneAndUpdate(dbButton._id, button, {
    new: true,
    useFindAndModify: false,
    upsert: true
  });

  return result ? true : false;
}
