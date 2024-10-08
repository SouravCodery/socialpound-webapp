"use client";

import classes from "./profile-header.module.css";

import { ProfileHeaderLoader } from "@/components/loaders/profile-header/profile-header-loader";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";

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
  const {
    fullName,
    profilePicture,
    bio,
    postsCount,
    followersCount,
    followingCount,
  } = user ?? {};

  const username = trimUsername(user?.username);

  if (isLoading || !user) {
    return <ProfileHeaderLoader />;
  }

  return (
    <div className={classes.profileHeader}>
      <div className={classes.username}>@{username}</div>
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
            <div className={classes.count}>{followersCount}</div>
            <div className={classes.counterName}>followers</div>
          </div>

          <div className={classes.counter}>
            <div className={classes.count}>{followingCount}</div>
            <div className={classes.counterName}>following</div>
          </div>
        </div>
      </div>

      <div className={classes.bio}>{bio}</div>

      {isOwnProfile && (
        <div className={classes.profileActions}>
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
        </div>
      )}
    </div>
  );
};
