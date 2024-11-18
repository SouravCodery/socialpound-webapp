"use client";

import clsx from "clsx";
import classes from "./profile-header.module.css";

import { ProfileHeaderLoader } from "@/components/loaders/profile-header/profile-header-loader";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { FriendshipButton } from "@/components/friendship-button/friendship-button";
import { Call } from "@/components/call/call";

import { UserInterface } from "@/models/interfaces/user.interface";
import { bakeToast } from "@/components/toasts/toasts";
import { trimUsername } from "@/helpers/misc.helpers";

export const ProfileHeader = ({
  user,
  isLoading,
  isOwnProfile,
}: {
  user?: UserInterface;
  isLoading: boolean;
  isOwnProfile: boolean;
}) => {
  const { fullName, profilePicture, bio, postsCount, friendsCount } =
    user ?? {};

  const username = trimUsername(user?.username);

  if (isLoading || !user) {
    return <ProfileHeaderLoader />;
  }

  return (
    <div className={classes.profileHeader}>
      <div className={clsx(classes.username, isOwnProfile && classes.center)}>
        @{username} {!isOwnProfile && <Call user={user} />}
      </div>
      <div className={classes.dpAndCounts}>
        <div className={classes.dpAndName}>
          <ProfilePicture dpURL={profilePicture ?? ""} scale={"large"} />
          <div className={classes.name}>
            <div>{fullName}</div>
          </div>
        </div>

        <div className={classes.counters}>
          <div className={classes.counter}>
            <div className={classes.count}>{postsCount}</div>
            <div className={classes.counterName}>posts</div>
          </div>

          <div className={classes.counter}>
            <div className={classes.count}>{friendsCount ?? 0}</div>
            <div className={classes.counterName}>friends</div>
          </div>

          {/* <div className={classes.counter}>
            <div className={classes.count}>{followingCount}</div>
            <div className={classes.counterName}>following</div>
          </div> */}
        </div>
      </div>

      <div className={classes.bio}>{bio}</div>
      {
        <div className={classes.profileActions}>
          {isOwnProfile ? (
            <button
              onClick={() => {
                bakeToast({
                  message: "Feature coming soon",
                });
              }}
              className={classes.profileActionsButton}
            >
              Edit Profile
            </button>
          ) : (
            <FriendshipButton
              className={classes.profileActionsButton}
              userId={user._id}
            />
          )}
        </div>
      }
    </div>
  );
};
