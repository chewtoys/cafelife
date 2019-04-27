import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent => {
            return `${parent.username} ${parent.name}`;
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;

            try {
                return prisma.$exists.user({
                    AND: [
                        {id: user.id},
                        {following_some: {
                            id: parentId
                            }
                        }
                    ]
                });
            } catch(error) {
                console.log(error);
                return false;
            }
        },
        isSelf: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;

            return user.id === parentId;
        }
    }
}