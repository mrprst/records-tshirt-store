import prisma from '../../../lib/prisma.ts';

export default async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.tshirt.findUnique({
      where: {
        id: data.productId,
      },
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: 'Error while getting info.' });
  }
};
